const mongoose = require("mongoose");

// ================== USER MODEL ==================
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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

export default mongoose.model("User", userSchema);

const User = mongoose.model("User", userSchema);

// ================== ROOM MODEL ==================
const roomSchema = new mongoose.Schema(
  {
    roomNumber: { type: Number, required: true, unique: true },
    currentDoctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    status: {
      type: String,
      enum: ["available", "occupied"],
      default: "available",
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

// ================== DOCTOR MODEL ==================
const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    specialization: { type: String, required: true },
    qualification: { type: String },
    experience: { type: Number },
    availableDays: [{ type: String }],
    availableTime: {
      start: { type: String },
      end: { type: String },
    },
    fees: { type: Number },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

// ================== PATIENT MODEL ==================
const patientSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    age: { type: Number },
    bloodGroup: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);

// ================== STAFF MODEL ==================
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

// ================== APPOINTMENT MODEL ==================
const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
    appointmentDate: { type: Date, required: true },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    reason: { type: String },
    status: {
      type: String,
      enum: ["booked", "checked-in", "completed", "cancelled"],
      default: "pending",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

// ================== Case History MODEL ==================
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

// ================== PAYMENT MODEL ==================
const paymentSchema = new mongoose.Schema(
  {
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    amount: { type: Number, required: true },
    method: { type: String, enum: ["cash", "card", "online"], required: true },
    status: {
      type: String,
      enum: ["paid", "pending", "failed"],
      default: "pending",
    },
    transactionId: { type: String }, 
    paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
