const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { collection: "users" }
);

UserSchema.index({ email: 1 });

module.exports = mongoose.model("User", UserSchema);
