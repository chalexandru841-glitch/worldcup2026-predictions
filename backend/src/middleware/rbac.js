// Roles: user < moderator < admin
const ROLE_HIERARCHY = { user: 1, moderator: 2, admin: 3 };

function requireRole(minRole) {
  return (req, res, next) => {
    const userRole = req.user?.role || "user";
    const userLevel = ROLE_HIERARCHY[userRole] || 0;
    const requiredLevel = ROLE_HIERARCHY[minRole] || 999;

    if (userLevel < requiredLevel) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }
    next();
  };
}

// Ensure a user can only modify their OWN resources
function requireOwnership(getResourceUserId) {
  return async (req, res, next) => {
    // Admins bypass ownership check
    if (req.user?.role === "admin") return next();
    try {
      const resourceUserId = await getResourceUserId(req);
      if (!resourceUserId || resourceUserId !== req.user?.sub) {
        return res.status(403).json({ error: "Access denied" });
      }
      next();
    } catch {
      res.status(500).json({ error: "Authorization check failed" });
    }
  };
}

module.exports = { requireRole, requireOwnership };
