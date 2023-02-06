const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });
  if (user) {
    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (validPassword) {
      const payload = {
        username: user.username,
        id: user._id,
      };
      const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
      res.status(200).send({ token, username: user.username, id: user._id });
    } else {
      res.status(400).json({ error: "Username or password is invalid!" });
    }
  } else {
    res.status(401).json({ error: "User does not exist!" });
  }
});

module.exports = loginRouter;
