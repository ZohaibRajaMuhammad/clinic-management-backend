const mongoose = require("mongoose");
const caseHistory = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    medicines: [
      {
        name: String,
        dosage: String,
        frequency: String,
        duration: String,
      },
    ],
    reports: [
      {
        reportType: { type: String, required: true },
        fileUrl: { type: String, required: true },
        description: String,
      },
    ],
    notes: { type: String },
  },
  { timestamps: true }
);

const CaseHistory = mongoose.model("CaseHistory", caseHistory);

module.exports = CaseHistory;
