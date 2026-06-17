// Prevent HPP attacks — e.g. ?role=user&role=admin
// Takes the LAST value for whitelisted params, first for everything else
const WHITELIST = ["sort", "fields", "limit", "offset"];

module.exports = function hpp(req, res, next) {
  const clean = (obj) => {
    if (!obj) return obj;
    return Object.fromEntries(
      Object.entries(obj).map(([key, val]) => {
        if (Array.isArray(val)) {
          // Whitelisted params: keep array; others: take last value only
          return [key, WHITELIST.includes(key) ? val : val[val.length - 1]];
        }
        return [key, val];
      })
    );
  };
  req.query = clean(req.query);
  req.body = clean(req.body);
  next();
};
