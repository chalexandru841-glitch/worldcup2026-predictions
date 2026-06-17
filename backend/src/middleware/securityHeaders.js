const helmet = require("helmet");

// Strict Content Security Policy
const cspDirectives = {
  defaultSrc: ["'self'"],
  scriptSrc: ["'self'"],
  styleSrc: ["'self', "'unsafe-inline'],
  imgSrc: ["'self', "data:", "https://flagcdn.com"],
  connectSrc: ["'self'],
  fontSrc: ["'self', "https://fonts.gstatic.com"],
  objectSrc: ["'none'],
  mediaSrc: ["'none'],
  frameSrc: ["'none'],
};

const securityHeaders = helmet({
  contentSecurityPolicy: { directives: cspDirectives },
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: { policy: "same-origin" },
  crossOriginResourcePolicy: { policy: "same-origin" },
  dnsPrefetchControl: { allow: false },
  frameguard: { action: "deny" },          // X-Frame-Options: DENY (clickjacking)
  hidePoweredBy: true,                      // Remove X-Powered-By
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  ieNoOpen: true,
  noSniff: true,                            // X-Content-Type-Options
  originAgentCluster: true,
  permittedCrossDomainPolicies: false,
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  xssFilter: true,
});

module.exports = securityHeaders;
