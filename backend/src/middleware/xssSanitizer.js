const { JSDOM } = require("jsdom");
const createDOMPurify = require("dompurify");

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

// Recursively sanitize all string values in an object
function sanitizeDeep(obj) {
  if (typeof obj === "string") {
    return DOMPurify.sanitize(obj, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
  }
  if (Array.isArray(obj)) return obj.map(sanitizeDeep);
  if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, sanitizeDeep(v)])
    );
  }
  return obj;
}

module.exports = function xssSanitizer(req, res, next) {
  if (req.body) req.body = sanitizeDeep(req.body);
  if (req.query) req.query = sanitizeDeep(req.query);
  if (req.params) req.params = sanitizeDeep(req.params);
  next();
};
