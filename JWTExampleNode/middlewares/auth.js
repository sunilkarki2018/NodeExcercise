const auth = async (req, res, next) => {
  // we are now only logging auth token
  console.log(req.headers.authorization);
  // invoke the next middleware function in the app
  next();
};

module.exports = auth;
