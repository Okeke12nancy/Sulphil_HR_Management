// this overrides the default express error handler.

const errorHandler = (err, req, res, next) => {
  // const statusCode = err.statusCode ? err.statusCode : 500;
  const statusCode = err.statusCode ? err.statusCode : 400;
  return res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
  // return next();
};

module.exports = errorHandler;
