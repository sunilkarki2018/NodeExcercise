const logger = (req, res, next) => {
  const dateNow = new Date();
  const dateString = `${dateNow.toLocaleDateString()} 
                        ${dateNow.toLocaleTimeString()}`;
  console.log("Date:", dateString);
  console.log("Method:", req.method);
  console.log("Url:  ", req.url);
  next();
};

module.exports = logger;
