// // utils/appointmentTemplate.js

// const appointmentTemplate = (type, data) => {
//   const { doctorName, patientName, appointmentDate, startAt, endAt, day } = data;

//   let subject = "";
//   let message = "";

//   // Format date and time readable form
//   const formattedDate = new Date(appointmentDate).toLocaleDateString("en-US", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   const startTime = new Date(startAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   const endTime = new Date(endAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

//   // Template logic based on type
//   if (type === "booked") {
//     subject = "🩺 New Appointment Booked";
//     message = `
//       <p>Dear Dr. <b>${doctorName}</b>,</p>
//       <p>A new appointment has been booked.</p>
//       <p><b>Patient:</b> ${patientName}</p>
//       <p><b>Date:</b> ${formattedDate} (${day})</p>
//       <p><b>Time:</b> ${startTime} - ${endTime}</p>
//       <p>Please be prepared for the consultation.</p>
//       <br/>
//       <p>Best Regards,</p>
//       <p><b>Clinic Management System</b></p>
//     `;
//   } else if (type === "cancelled") {
//     subject = "⚠️ Appointment Cancelled";
//     message = `
//       <p>Dear Dr. <b>${doctorName}</b>,</p>
//       <p>The following appointment has been <b>cancelled</b>:</p>
//       <p><b>Patient:</b> ${patientName}</p>
//       <p><b>Date:</b> ${formattedDate} (${day})</p>
//       <p><b>Time:</b> ${startTime} - ${endTime}</p>
//       <p>Please update your schedule accordingly.</p>
//       <br/>
//       <p>Regards,</p>
//       <p><b>Clinic Management System</b></p>
//     `;
//   } else if (type === "confirmed") {
//     subject = "✅ Appointment Confirmed";
//     message = `
//       <p>Dear <b>${patientName}</b>,</p>
//       <p>Your appointment has been <b>confirmed</b> successfully.</p>
//       <p><b>Doctor:</b> Dr. ${doctorName}</p>
//       <p><b>Date:</b> ${formattedDate} (${day})</p>
//       <p><b>Time:</b> ${startTime} - ${endTime}</p>
//       <p>Please arrive 10 minutes early for your session.</p>
//       <br/>
//       <p>Best Regards,</p>
//       <p><b>Clinic Management System</b></p>
//     `;
//   }

//   return { subject, html: message };
// };

// module.exports = appointmentTemplate;



// utils/appointmentTemplate.js

const appointmentTemplate = (type, data) => {
  const { doctorName, patientName, appointmentDate, startAt, endAt, day, reason, appointmentId } = data;
  

  let subject = "";
  let message = "";

  // Format date and time readable form
  const formattedDate = new Date(appointmentDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const startTime = new Date(startAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const endTime = new Date(endAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Template logic based on type
  if (type === "booked") {
    subject = "🎯 New Appointment Booked - Action Required";
    message = `
<div style="
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; 
  max-width: 600px; 
  margin: 0 auto; 
  background: linear-gradient(135deg, #ffffff 0%, #f8faff 100%);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(123, 97, 255, 0.15);
  border: 1px solid #e8eaff;
">
  <!-- Header -->
  <div style="
    background: linear-gradient(135deg, #7b61ff 0%, #5a43d6 100%);
    padding: 40px 30px;
    text-align: center;
    color: white;
    position: relative;
  ">
    <div style="
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    "></div>
    <h1 style="
      font-size: 28px;
      font-weight: 700;
      margin: 0 0 8px 0;
      position: relative;
      z-index: 2;
    ">🩺 New Appointment</h1>
    <p style="
      font-size: 16px;
      opacity: 0.9;
      margin: 0;
      position: relative;
      z-index: 2;
      font-weight: 400;
    ">Medical Consultation Scheduled</p>
  </div>

  <!-- Content -->
  <div style="padding: 40px 30px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <h2 style="
        font-size: 24px;
        font-weight: 700;
        color: #2b2b2b;
        margin: 0 0 10px 0;
      ">New Appointment Booked</h2>
      <p style="color: #666; margin: 0;">Dear Dr. <strong>${doctorName}</strong></p>
    </div>

    <!-- Appointment Details -->
    <div style="
      background: #f8f9ff;
      border-radius: 16px;
      padding: 30px;
      margin: 30px 0;
      border: 1px solid #e8eaff;
    ">
      <h3 style="
        font-size: 18px;
        font-weight: 600;
        color: #7b61ff;
        margin: 0 0 25px 0;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 1px;
      ">Appointment Details</h3>
      
      <div style="display: grid; grid-template-columns: 1fr; gap: 15px;">
        <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e8eaff;">
          <span style="font-weight: 600; color: #555;">Patient Name:</span>
          <span style="color: #7b61ff; font-weight: 600;">${patientName}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e8eaff;">
          <span style="font-weight: 600; color: #555;">Appointment Date:</span>
          <span style="color: #2b2b2b;">${formattedDate}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e8eaff;">
          <span style="font-weight: 600; color: #555;">Day:</span>
          <span style="color: #2b2b2b;">${day}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e8eaff;">
          <span style="font-weight: 600; color: #555;">Time Slot:</span>
          <span style="color: #dc2626; font-weight: 600;">${startTime} - ${endTime}</span>
        </div>
        ${reason ? `
        <div style="padding: 12px 0;">
          <span style="font-weight: 600; color: #555; display: block; margin-bottom: 8px;">Reason:</span>
          <span style="color: #666; background: #fff; padding: 12px; border-radius: 8px; display: block; border: 1px solid #e8eaff;">${reason}</span>
        </div>
        ` : ''}
        ${appointmentId ? `
        <div style="display: flex; justify-content: space-between; padding: 12px 0;">
          <span style="font-weight: 600; color: #555;">Appointment ID:</span>
          <span style="color: #7b61ff; font-family: monospace; font-weight: 600;">#${appointmentId}</span>
        </div>
        ` : ''}
      </div>
    </div>

    <!-- Action Required -->
    <div style="
      background: linear-gradient(135deg, #fef3e2, #fef7ed);
      border: 1px solid #fed7aa;
      border-radius: 12px;
      padding: 25px;
      margin: 25px 0;
      text-align: center;
    ">
      <h4 style="
        color: #ea580c;
        margin: 0 0 15px 0;
        font-size: 16px;
        font-weight: 600;
      ">📋 Action Required</h4>
      <p style="color: #666; margin: 0; font-size: 14px; line-height: 1.5;">
        Please review the appointment details and prepare for the consultation. 
        Ensure all necessary equipment and records are ready.
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #e8eaff;">
      <p style="color: #666; margin: 0 0 20px 0; font-size: 14px;">
        Need to make changes? Please contact the clinic administration.
      </p>
      <p style="
        font-weight: 600;
        color: #2b2b2b;
        margin: 0;
        font-size: 16px;
      ">— Clinic Management System</p>
      <p style="color: #999; margin: 10px 0 0 0; font-size: 12px;">
        Automated Notification • Do not reply to this email
      </p>
    </div>
  </div>
</div>
    `;
  } else if (type === "cancelled") {
    subject = "❌ Appointment Cancelled - Schedule Update";
    message = `
<div style="
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; 
  max-width: 600px; 
  margin: 0 auto; 
  background: linear-gradient(135deg, #ffffff 0%, #fff5f5 100%);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(220, 38, 38, 0.15);
  border: 1px solid #fee2e2;
">
  <!-- Header -->
  <div style="
    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
    padding: 40px 30px;
    text-align: center;
    color: white;
    position: relative;
  ">
    <div style="
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
     
    "></div>
    <h1 style="
      font-size: 28px;
      font-weight: 700;
      margin: 0 0 8px 0;
      position: relative;
      z-index: 2;
    ">❌ Appointment Cancelled</h1>
    <p style="
      font-size: 16px;
      opacity: 0.9;
      margin: 0;
      position: relative;
      z-index: 2;
      font-weight: 400;
    ">Schedule Update Notification</p>
  </div>

  <!-- Content -->
  <div style="padding: 40px 30px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="
        background: linear-gradient(135deg, #dc262620, #b91c1c20);
        border-radius: 50%;
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
        border: 2px solid #dc262640;
      ">
        <span style="font-size: 32px;">⚠️</span>
      </div>
      <h2 style="
        font-size: 24px;
        font-weight: 700;
        color: #2b2b2b;
        margin: 0 0 10px 0;
      ">Appointment Cancelled</h2>
      <p style="color: #666; margin: 0;">Dear Dr. <strong>${doctorName}</strong></p>
    </div>

    <!-- Cancelled Appointment Details -->
    <div style="
      background: #fef2f2;
      border-radius: 16px;
      padding: 30px;
      margin: 30px 0;
      border: 1px solid #fee2e2;
    ">
      <h3 style="
        font-size: 18px;
        font-weight: 600;
        color: #dc2626;
        margin: 0 0 25px 0;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 1px;
      ">Cancelled Appointment</h3>
      
      <div style="display: grid; grid-template-columns: 1fr; gap: 15px;">
        <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #fee2e2;">
          <span style="font-weight: 600; color: #555;">Patient Name:</span>
          <span style="color: #dc2626; font-weight: 600;">${patientName}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #fee2e2;">
          <span style="font-weight: 600; color: #555;">Original Date:</span>
          <span style="color: #2b2b2b; text-decoration: line-through;">${formattedDate}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #fee2e2;">
          <span style="font-weight: 600; color: #555;">Day:</span>
          <span style="color: #2b2b2b; text-decoration: line-through;">${day}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #fee2e2;">
          <span style="font-weight: 600; color: #555;">Time Slot:</span>
          <span style="color: #dc2626; font-weight: 600; text-decoration: line-through;">${startTime} - ${endTime}</span>
        </div>
        ${appointmentId ? `
        <div style="display: flex; justify-content: space-between; padding: 12px 0;">
          <span style="font-weight: 600; color: #555;">Appointment ID:</span>
          <span style="color: #dc2626; font-family: monospace; font-weight: 600;">#${appointmentId}</span>
        </div>
        ` : ''}
      </div>
    </div>

    <!-- Available Slot Notice -->
    <div style="
      background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
      border: 1px solid #bae6fd;
      border-radius: 12px;
      padding: 25px;
      margin: 25px 0;
      text-align: center;
    ">
      <h4 style="
        color: #0369a1;
        margin: 0 0 15px 0;
        font-size: 16px;
        font-weight: 600;
      ">📅 Available Time Slot</h4>
      <p style="color: #666; margin: 0; font-size: 14px; line-height: 1.5;">
        This time slot is now available for new appointments. 
        Your schedule has been updated accordingly.
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #fee2e2;">
      <p style="color: #666; margin: 0 0 20px 0; font-size: 14px;">
        Contact administration for any schedule adjustments.
      </p>
      <p style="
        font-weight: 600;
        color: #2b2b2b;
        margin: 0;
        font-size: 16px;
      ">— Clinic Management System</p>
      <p style="color: #999; margin: 10px 0 0 0; font-size: 12px;">
        Automated Notification • Do not reply to this email
      </p>
    </div>
  </div>
</div>
    `;
  } else if (type === "confirmed") {
    subject = "✅ Appointment Confirmed - See You Soon!";
    message = `
<div style="
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; 
  max-width: 600px; 
  margin: 0 auto; 
  background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(16, 185, 129, 0.15);
  border: 1px solid #dcfce7;
">
  <!-- Header -->
  <div style="
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    padding: 40px 30px;
    text-align: center;
    color: white;
    position: relative;
  ">
    <div style="
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"none\"><path d=\"M0,0 L100,0 L100,100 Z\" fill=\"rgba(255,255,255,0.1)\"/></svg>');
      background-size: cover;
    "></div>
    <h1 style="
      font-size: 28px;
      font-weight: 700;
      margin: 0 0 8px 0;
      position: relative;
      z-index: 2;
    ">✅ Appointment Confirmed</h1>
    <p style="
      font-size: 16px;
      opacity: 0.9;
      margin: 0;
      position: relative;
      z-index: 2;
      font-weight: 400;
    ">Your Visit is Scheduled</p>
  </div>

  <!-- Content -->
  <div style="padding: 40px 30px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="
        background: linear-gradient(135deg, #10b98120, #05966920);
        border-radius: 50%;
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
        border: 2px solid #10b98140;
      ">
        <span style="font-size: 32px;">🎉</span>
      </div>
      <h2 style="
        font-size: 24px;
        font-weight: 700;
        color: #2b2b2b;
        margin: 0 0 10px 0;
      ">Appointment Confirmed!</h2>
      <p style="color: #666; margin: 0;">Dear <strong>${patientName}</strong></p>
    </div>

    <!-- Confirmed Appointment Details -->
    <div style="
      background: #f0fdf4;
      border-radius: 16px;
      padding: 30px;
      margin: 30px 0;
      border: 1px solid #dcfce7;
    ">
      <h3 style="
        font-size: 18px;
        font-weight: 600;
        color: #059669;
        margin: 0 0 25px 0;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 1px;
      ">Appointment Details</h3>
      
      <div style="display: grid; grid-template-columns: 1fr; gap: 15px;">
        <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #dcfce7;">
          <span style="font-weight: 600; color: #555;">Doctor:</span>
          <span style="color: #059669; font-weight: 600;">Dr. ${doctorName}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #dcfce7;">
          <span style="font-weight: 600; color: #555;">Appointment Date:</span>
          <span style="color: #2b2b2b; font-weight: 600;">${formattedDate}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #dcfce7;">
          <span style="font-weight: 600; color: #555;">Day:</span>
          <span style="color: #2b2b2b;">${day}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #dcfce7;">
          <span style="font-weight: 600; color: #555;">Time Slot:</span>
          <span style="color: #dc2626; font-weight: 600;">${startTime} - ${endTime}</span>
        </div>
        ${reason ? `
        <div style="padding: 12px 0;">
          <span style="font-weight: 600; color: #555; display: block; margin-bottom: 8px;">Reason:</span>
          <span style="color: #666; background: #fff; padding: 12px; border-radius: 8px; display: block; border: 1px solid #dcfce7;">${reason}</span>
        </div>
        ` : ''}
        ${appointmentId ? `
        <div style="display: flex; justify-content: space-between; padding: 12px 0;">
          <span style="font-weight: 600; color: #555;">Appointment ID:</span>
          <span style="color: #059669; font-family: monospace; font-weight: 600;">#${appointmentId}</span>
        </div>
        ` : ''}
      </div>
    </div>

    <!-- Important Instructions -->
    <div style="
      background: linear-gradient(135deg, #fef3e2, #fef7ed);
      border: 1px solid #fed7aa;
      border-radius: 12px;
      padding: 25px;
      margin: 25px 0;
    ">
      <h4 style="
        color: #ea580c;
        margin: 0 0 15px 0;
        font-size: 16px;
        font-weight: 600;
        text-align: center;
      ">📋 Important Instructions</h4>
      <div style="display: grid; grid-template-columns: 1fr; gap: 12px;">
        <div style="display: flex; align-items: center;">
          <span style="background: #ea580c; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 12px; margin-right: 12px;">1</span>
          <span style="color: #666; font-size: 14px;">Please arrive <strong>10-15 minutes early</strong> for registration</span>
        </div>
        <div style="display: flex; align-items: center;">
          <span style="background: #ea580c; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 12px; margin-right: 12px;">2</span>
          <span style="color: #666; font-size: 14px;">Bring your <strong>ID card and insurance details</strong> if applicable</span>
        </div>
        <div style="display: flex; align-items: center;">
          <span style="background: #ea580c; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 12px; margin-right: 12px;">3</span>
          <span style="color: #666; font-size: 14px;">Carry any <strong>previous medical reports or prescriptions</strong></span>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #dcfce7;">
      <p style="color: #666; margin: 0 0 20px 0; font-size: 14px;">
        Need to reschedule? Please contact us at least 24 hours in advance.
      </p>
      <p style="
        font-weight: 600;
        color: #2b2b2b;
        margin: 0;
        font-size: 16px;
      ">— Clinic Management System</p>
      <p style="color: #999; margin: 10px 0 0 0; font-size: 12px;">
        We look forward to serving you • Automated Confirmation
      </p>
    </div>
  </div>
</div>
    `;
  }

  return { subject, html: message };
};

module.exports = appointmentTemplate;