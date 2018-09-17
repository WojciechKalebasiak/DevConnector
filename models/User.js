const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name must be provided"],
    unique: true
  },
  email: {
    type: String,
    required: [true, "Email must be provided"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: props => `${props.value} is not correct email`
    }
  },
  password: {
    type: String,
    required: [true, "Password must be provided"]
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = User = mongoose.model("user", UserSchema);
