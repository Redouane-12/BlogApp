const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      avatarUrl: {
        type: String,
        default: '',
      },
    },
    {
      timestamps: true,
    }
  );

const User = new mongoose.model("users", userSchema);

module.exports = User;