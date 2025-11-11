const User = require("../models/user.js");
const Doctor = require("../models/doctor.js");
const Patient = require("../models/pateint.js");
const Appointment = require("../models/appointment.js");
const CaseHistory = require("../models/caseHistory.js");

const getTopCards = async (req, res) => {
  try {
    const { userId, role } = req.user;
    let cards = [];

    let doctorDoc = null;
    let patientDoc = null;

    // Find linked Doctor or Patient
    if (role === "doctor") {
      doctorDoc = await Doctor.findOne({ userId });
      if (!doctorDoc)
        return res.status(404).json({ error: "Doctor profile not found" });
    }

    if (role === "patient") {
      patientDoc = await Patient.findOne({ userId });
      if (!patientDoc)
        return res.status(404).json({ error: "Patient profile not found" });
    }

    // 🧑‍💼 ADMIN
    if (role === "admin") {
      const [patients, doctors, appointments, caseHistories] =
        await Promise.all([
          User.countDocuments({ role: "patient" }),
          User.countDocuments({ role: "doctor" }),
          Appointment.countDocuments({
            appointmentDate: {
              $gte: new Date(new Date().setHours(0, 0, 0, 0)),
              $lt: new Date(new Date().setHours(23, 59, 59, 999)),
            },
          }),
          CaseHistory.countDocuments(),
        ]);

      cards = [
        { title: "Total Patients", value: patients },
        { title: "Total Doctors", value: doctors },
        { title: "Active Appointments", value: appointments },
        { title: "Case Histories", value: caseHistories },
      ];
    }

    // 🩺 DOCTOR
    else if (role === "doctor") {
      const doctorId = doctorDoc._id;

      const [todayAppointments, caseCreated, allAppointments, upcoming] =
        await Promise.all([
          Appointment.countDocuments({
            doctorId,
            appointmentDate: {
              $gte: new Date(new Date().setHours(0, 0, 0, 0)),
              $lt: new Date(new Date().setHours(23, 59, 59, 999)),
            },
          }),
          CaseHistory.countDocuments({ doctorId }),
          Appointment.find({ doctorId }).select("patientId"),
          Appointment.findOne({
            doctorId,
            appointmentDate: { $gte: new Date() },
          }).sort({ appointmentDate: 1 }),
        ]);

      const uniquePatients = new Set(
        allAppointments.map((a) => a.patientId.toString())
      );
      const upcomingCount = upcoming ? 1 : 0;

      cards = [
        { title: "Today's Appointments", value: todayAppointments },
        { title: "Case Histories Created", value: caseCreated },
        { title: "Total Patients Seen", value: uniquePatients.size },
        { title: "Upcoming Appointments", value: upcomingCount },
      ];
    }

    // 👨‍⚕️ PATIENT
    else if (role === "patient") {
      const patientId = patientDoc._id;

      const [recentAppointment, upcoming, prescriptions, completed] =
        await Promise.all([
          Appointment.findOne({ patientId }).sort({ appointmentDate: -1 }),
          Appointment.findOne({
            patientId,
            appointmentDate: { $gte: new Date() },
          }).sort({ appointmentDate: 1 }),
          CaseHistory.countDocuments({ patientId }),
          Appointment.countDocuments({
            patientId,
            status: "completed",
          }),
        ]);

      const hasAssignedDoctor = recentAppointment ? 1 : 0;
      const hasUpcomingAppointment = upcoming ? 1 : 0;

      cards = [
        { title: "Assigned Doctor", value: hasAssignedDoctor },
        { title: "Upcoming Appointment", value: hasUpcomingAppointment },
        { title: "Total Prescriptions", value: prescriptions },
        { title: "Appointments Done", value: completed },
      ];
    }

    // ❌ Invalid Role
    else {
      return res.status(403).json({ error: "Invalid role" });
    }

    res.status(200).json({ success: true, role, cards });
  } catch (error) {
    console.error("Error in /api/TopCards:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: users.length, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res
      .status(200)
      .json({
        success: true,
        message: "User updated successfully",
        updatedUser,
      });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
  getTopCards,
};
