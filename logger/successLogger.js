const logger = require('.');

const successLogger = (req, res, next) => {
  res.on('finish', () => {
    if (res.statusCode < 300 || res.statusCode === 304) {
      logger.info('success', {
        status: res.statusCode,
        originalUrl: req.originalUrl,
        path: req.path,
        method: req.method,
        ip: req.ip,
        duration: parseInt(res.getHeaders()['x-response-time'], 10),
        headers: { ...req.headers, Authorization: '<SECRET TOKEN HIDDEN>' },
        body: { ...req.body, token: '<SECRET TOKEN HIDDEN>' },
        params: req.params,
        query: req.query || {},
        user: req.user || {},
      });
    }
  });

  next();
};

module.exports = successLogger;
