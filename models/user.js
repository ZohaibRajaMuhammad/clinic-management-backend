const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String},
    role: {
      type: String,
      enum: ["admin", "doctor", "staff", "patient"],
      default: "patient",
    },
    phone: { type: String },
    gender: { type: String, enum: ["male", "female", "other"] },
    profileImage: { type: String },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    resetToken: { type: String, default: null },
    resetTokenExpiry: { type: Date, default: null },
    inviteToken: { type: String, default: null },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User