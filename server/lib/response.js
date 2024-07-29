const responseHandler = (res, statusCode, data = null, message = null) => {
  return res.status(statusCode).json({
    success: statusCode >= 200 && statusCode < 300,
    message,
    data,
  });
};

module.exports = responseHandler;
