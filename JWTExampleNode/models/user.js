const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: String,
});

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.passwordHash;
  },
});

UserSchema.plugin(uniqueValidator);

const UserModel = mongoose.model("User", UserSchema, "JWTUsers");
module.exports = UserModel;
