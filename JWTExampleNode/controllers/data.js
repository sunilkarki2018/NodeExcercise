const jwt = require("jsonwebtoken");
const dataRouter = require("express").Router();

dataRouter.get("/", (req, res) => {
  // get authorization token
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer")) {
    res.status(401).json({ error: "User token missing or invalid!" });
  } else {
    // get token
    const token = authorization.split(" ")[1];
    try {
      // verify token
      const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      // send response back to client
      res
        .status(200)
        .json({
          msg: `GET request with ${payload.username} successfully received!`,
        });
    } catch (error) {
      res.status(401).json({ error: "JWT token is unauthorized!" });
    }
  }
});

module.exports = dataRouter;
