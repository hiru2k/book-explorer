const handleErrors = (res, error, statusCode = 500) =>
  res.status(statusCode).json({ msg: error.message || error });

module.exports = { handleErrors };
