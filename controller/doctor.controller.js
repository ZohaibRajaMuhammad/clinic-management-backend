const CaseHistory = require("../models/caseHistory");
const Appointment = require("../models/appointment");
const Doctor = require("../models/doctor");
const Patient = require("../models/pateint");

// Utility API to fix availableDays format for all doctors
// const fixAvailableDays = async (req, res) => {
//   try {
//     const doctors = await Doctor.find();
//     let updatedCount = 0;

//     for (const doctor of doctors) {
//       // Case: availableDays is an array with a single string element like ['["Mon","Tue"]']
//       if (
//         Array.isArray(doctor.availableDays) &&
//         doctor.availableDays.length === 1 &&
//         typeof doctor.availableDays[0] === "string" &&
//         doctor.availableDays[0].includes("[")
//       ) {
//         try {
//           const parsedDays = JSON.parse(doctor.availableDays[0]); // Parse inner JSON string
//           if (Array.isArray(parsedDays)) {
//             doctor.availableDays = parsedDays; // Replace with proper array
//             await doctor.save();
//             updatedCount++;
//           }
//         } catch (error) {
//           console.warn(`⚠️ Doctor ${doctor._id} has invalid availableDays value`);
//         }
//       }
//     }

//     return res.status(200).json({
//       message: `✅ Fixed ${updatedCount} doctor records successfully.`,
//     });
//   } catch (error) {
//     console.error("Fix AvailableDays Error:", error);
//     return res
//       .status(500)
//       .json({ message: "Server error", error: error.message });
//   }
// };

// const createCaseHistory = async (req, res) => {
//   try {
//     const { appointmentId, doctorId, patientId, medicines, reports, notes } =
//       req.body;

//     // Step 1: Validation
//     if (!appointmentId || !doctorId || !patientId) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // Step 2: Check doctor and appointment validity
//     const doctor = await Doctor.findById(doctorId);
//     if (!doctor) return res.status(404).json({ message: "Doctor not found" });

//     const appointment = await Appointment.findById(appointmentId);
//     if (!appointment)
//       return res.status(404).json({ message: "Appointment not found" });

//     if (appointment.doctorId.toString() !== doctorId.toString()) {
//       return res
//         .status(403)
//         .json({ message: "Doctor not assigned to this appointment" });
//     }

//     // Step 3: Create Case History
//     const newCase = await CaseHistory.create({
//       appointmentId,
//       doctorId,
//       patientId,
//       medicines,
//       reports,
//       notes,
//     });

//     // Optionally mark appointment as completed
//     appointment.status = "completed";
//     await appointment.save();

//     return res.status(201).json({
//       message: "Case history created successfully",
//       caseHistory: newCase,
//     });
//   } catch (error) {
//     console.error("Create Case History Error:", error);
//     return res
//       .status(500)
//       .json({ message: "Server Error", error: error.message });
//   }
// };

// const getCaseHistory = async (req, res) => {
//   try {
//     const { userId, role } = req.query;

//     if (!userId || !role) {
//       return res
//         .status(400)
//         .json({ message: "Missing required query parameters" });
//     }

//     let filter = {};
//     if (role === "doctor") filter.doctorId = userId;
//     else if (role === "patient") filter.patientId = userId;
//     else return res.status(400).json({ message: "Invalid role" });

//     const histories = await CaseHistory.find(filter)
//       .populate("appointmentId", "appointmentDate startAt endAt status")
//       .populate("doctorId", "userId specialization")
//       .populate("patientId", "userId age bloodGroup address")
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       count: histories.length,
//       caseHistories: histories,
//     });
//   } catch (error) {
//     console.error("Get Case History Error:", error);
//     return res
//       .status(500)
//       .json({ message: "Server Error", error: error.message });
//   }
// };

const createCaseHistory = async (req, res) => {
  try {
    const { appointmentId, doctorId, patientId, medicines, reports, notes } =
      req.body;

    if (!appointmentId || !doctorId || !patientId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    if (appointment.doctorId.toString() !== doctorId.toString()) {
      return res
        .status(403)
        .json({ message: "Doctor not assigned to this appointment" });
    }

    const newCase = await CaseHistory.create({
      appointmentId,
      doctorId,
      patientId,
      medicines,
      reports,
      notes,
    });

    appointment.status = "completed";
    await appointment.save();

    return res.status(201).json({
      message: "Case history created successfully",
      caseHistory: newCase,
    });
  } catch (error) {
    console.error("Create Case History Error:", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

// const getCaseHistories = async (req, res) => {
//   try {
//     const { userId, role } = req.query;

//     if (!userId || !role) {
//       return res
//         .status(400)
//         .json({ message: "Missing required query parameters" });
//     }

//     let filter = {};
//     if (role === "admin") {
//       filter = {};
//     } else if (role === "doctor") {
//       filter.doctorId = userId;
//     } else if (role === "patient") {
//       filter.patientId = userId;
//     } else {
//       return res.status(400).json({ message: "Invalid role" });
//     }

//     const histories = await CaseHistory.find(filter)
//       .populate("appointmentId", "appointmentDate startAt endAt status")
//       .populate("doctorId", "userId specialization")
//       .populate("patientId", "userId age bloodGroup address")
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       count: histories.length,
//       caseHistories: histories,
//     });
//   } catch (error) {
//     console.error("Get Case History Error:", error);
//     return res
//       .status(500)
//       .json({ message: "Server Error", error: error.message });
//   }
// };

const getCaseHistories = async (req, res) => {
  try {
    const { userId, role } = req.query;

    if (!userId || !role) {
      return res
        .status(400)
        .json({ message: "Missing required query parameters" });
    }

    let filter = {};
    if (role === "admin") {
      filter = {};
    } else if (role === "doctor") {
      filter.doctorId = userId;
    } else if (role === "patient") {
      filter.patientId = userId;
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    const histories = await CaseHistory.find(filter)
      // Populate Appointment Info
      .populate("appointmentId", "appointmentDate startAt endAt status")

      // Populate Doctor Info (doctor schema)
      .populate({
        path: "doctorId",
        select: "specialization userId",
        populate: {
          path: "userId",
          select: "name email phone gender profileImage",
        },
      })

      // Populate Patient Info (patient schema)
      .populate({
        path: "patientId",
        select: "age bloodGroup address userId",
        populate: {
          path: "userId",
          select: "name email phone gender profileImage",
        },
      })

      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: histories.length,
      caseHistories: histories,
    });
  } catch (error) {
    console.error("Get Case History Error:", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};


const updateCaseHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, userId } = req.query;

    const caseHistory = await CaseHistory.findById(id);
    if (!caseHistory)
      return res.status(404).json({ message: "Case history not found" });

    // Role-based access
    if (
      role === "doctor" &&
      caseHistory.doctorId.toString() !== userId.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this case" });
    } else if (role === "patient") {
      return res
        .status(403)
        .json({ message: "Patients cannot update case history" });
    }

    const updated = await CaseHistory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .json({ message: "Case history updated", caseHistory: updated });
  } catch (error) {
    console.error("Update Case History Error:", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

const deleteCaseHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, userId } = req.query;

    const caseHistory = await CaseHistory.findById(id);
    if (!caseHistory)
      return res.status(404).json({ message: "Case history not found" });

    // Only admin or doctor who created it can delete
    if (
      role === "doctor" &&
      caseHistory.doctorId.toString() !== userId.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this case" });
    } else if (role === "patient") {
      return res
        .status(403)
        .json({ message: "Patients cannot delete case history" });
    }

    await CaseHistory.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Case history deleted successfully" });
  } catch (error) {
    console.error("Delete Case History Error:", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

const getallDoctors = async (req, res) => {
  try {
    // const doctors = await Doctor.find()
    const doctors = await Doctor.find().populate(
      "userId",
      "name email phone profileImage"
    );

    res.status(200).json({ message: "sucess", data: doctors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// module.exports = { createCaseHistory, getCaseHistory, getallDoctors };
module.exports = {
  createCaseHistory,
  getCaseHistories,
  updateCaseHistory,
  deleteCaseHistory,
  getallDoctors,
};
