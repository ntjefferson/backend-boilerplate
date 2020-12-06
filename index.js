require('dotenv').config();

const express = require('express');
const cors = require('cors');
const responseTime = require('response-time');

const logger = require('./logger');
const successLogger = require('./logger/successLogger');

const port = process.env.PORT || 5000;
const app = express();

app.use(responseTime({ digits: 0, suffix: false }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handles successful requests
app.use(successLogger);

// Start of routes
app.use('/v1', require('./api/v1'));

// Error handler
app.use((err, req, res, next) => {
  if (!err.details) {
    // eslint-disable-next-line no-param-reassign
    err = { details: err };
  }

  const status = err.status || err.details.status;
  const message = err.message || err.details.message;

  logger.error(message, {
    status: status || 500,
    originalUrl: req.originalUrl,
    path: req.path,
    method: req.method,
    ip: req.ip,
    duration: parseInt(res.getHeaders()['x-response-time'], 10),
    headers: { ...req.headers, Authorization: '<SECRET TOKEN HIDDEN>' },
    body: req.body,
    params: req.params,
    ...err,
  });

  res.status(status || 500).send({
    status: status || 500,
    message:
      message
      || 'There was an error processing the request. Please contact support.',
  });
});

// eslint-disable-next-line no-console
module.exports = app.listen(port, () => console.log(`🚀 Now listening on port ${port}...`));
