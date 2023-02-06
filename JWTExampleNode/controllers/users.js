const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (req, res, next) => {
  const { username, password } = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username: username,
    passwordHash: passwordHash,
  });

  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
