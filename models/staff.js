const mongoose = require('mongoose')
const staffSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    designation: { type: String, enum: ["receptionist", "assistant", "nurse"], required: true },
    shiftTiming: { type: String },
  },
  { timestamps: true }
);

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff