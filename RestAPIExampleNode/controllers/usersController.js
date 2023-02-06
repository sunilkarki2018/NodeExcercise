// use sample users data
//let { users } = require("../data");

// require User moodel
const User = require("../models/User");

// get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (user) res.status(200).json({ success: true, data: user });
  else res.status(500).json({ success: false, error: "User not found!" });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  // find user
  const user = users.find((user) => user.id === Number(id));
  // user not found
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: `No user found with id ${id}` });
  }
  // filter user with id away from users collection
  users = users.filter((user) => user.id !== Number(id));
  // return users
  res.status(200).json({ success: true, data: users });
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.query;
  let user = await User.findByIdAndUpdate(id, req.query, { new: true });
  if (user) res.status(200).json({ success: true, data: user });
  else
    res
      .status(500)
      .json({ success: false, error: `No user found with id ${id}` });
};
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log(user);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, msg: "No user value provided!" });
  }
};

// export modules
module.exports = {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  createUser,
};
