const express = require("express");
const router = express.Router();

// require controller modules
const usersController = require("../controllers/usersController");

// users routes

router.get("/", usersController.getUsers);
router.get("/:id", usersController.getUser);
router.post("/", usersController.createUser);
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

module.exports = router;
