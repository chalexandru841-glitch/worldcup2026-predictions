const { z } = require("zod");

// Strip any keys not in a known set — prevents mass assignment
function stripUnknown(allowed, body) {
  return Object.fromEntries(
    Object.entries(body).filter(([k]) => allowed.includes(k))
  );
}

// Zod schemas for every endpoint
const schemas = {
  register: z.object({
    email: z.string().email().max(254).toLowerCase(),
    password: z.string().min(8).max(128),
    display_name: z.string().min(2).max(50).regex(/^[\w\s\-\.]+$/),
  }),
  login: z.object({
    email: z.string().email().max(254).toLowerCase(),
    password: z.string().min(1).max(128),
  }),
  prediction: z.object({
    match_id: z.string().uuid(),
    predicted_home: z.number().int().min(0).max(30),
    predicted_away: z.number().int().min(0).max(30),
  }),
};

function validate(schemaName) {
  return (req, res, next) => {
    const schema = schemas[schemaName];
    if (!schema) return next();
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(422).json({
        error: "Validation failed",
        details: result.error.flatten().fieldErrors,
      });
    }
    req.body = result.data; // use cleaned data
    next();
  };
}

module.exports = { validate, stripUnknown };
