function inviteTemplate(name, role, inviteLink) {
  // return `
  //   <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
  //     <h2 style="color: #2b2b2b;">You're Invited to Join Clinic</h2>
  //     <p>Hi ${name},</p>
  //     <p>We’re excited to invite you to join our Clinic platform ${role ? `as a <strong>${role}</strong>` : ''}. Click the button below to set up your account and get started.</p>
  //     <p>If you weren’t expecting this invitation, you can safely ignore this email.</p>

  //     <a href="${inviteLink}"
  //        style="display: inline-block; padding: 12px 25px; background-color: #7b61ff; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 15px;">
  //        Accept Invitation
  //     </a>

  //     <p style="margin-top: 30px; font-size: 14px;">
  //       If the button doesn’t work, copy and paste the following link in your browser:<br>
  //       <a href="${inviteLink}" style="color: #7b61ff;">${inviteLink}</a>
  //     </p>

  //     <p style="margin-top: 40px; font-weight: bold;">— The Clinic Team</p>
  //   </div>
  // `;
  return `      
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
    padding: 50px 40px;
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
      font-size: 32px;
      font-weight: 700;
      margin: 0 0 8px 0;
      position: relative;
      z-index: 2;
    ">MediCare Clinic</h1>
    <p style="
      font-size: 16px;
      opacity: 0.9;
      margin: 0;
      position: relative;
      z-index: 2;
      font-weight: 400;
    ">Excellence in Healthcare</p>
  </div>

  <!-- Content -->
  <div style="padding: 50px 40px;">
    <h2 style="
      font-size: 32px;
      font-weight: 700;
      color: #2b2b2b;
      margin: 0 0 20px 0;
      text-align: center;
      background: linear-gradient(135deg, #7b61ff, #5a43d6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    ">You're Invited! 🎉</h2>
    
    <p style="
      font-size: 18px;
      color: #555;
      margin: 0 0 25px 0;
      line-height: 1.6;
      text-align: center;
    ">Hi <strong>${name}</strong>,</p>
    
    <p style="
      font-size: 16px;
      color: #666;
      margin: 0 0 25px 0;
      line-height: 1.6;
      text-align: center;
    ">
      We are thrilled to invite you to join our elite healthcare platform 
      ${role ? `as a <strong style="color: #7b61ff;">${role}</strong>` : ""}. 
      Get ready to experience seamless medical collaboration and management.
    </p>

    <!-- Role Badge -->
    ${
      role
        ? `
    <div style="
      background: linear-gradient(135deg, #7b61ff15, #5a43d615);
      border: 1px solid #7b61ff30;
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      margin: 30px 0;
    ">
      <div style="
        display: inline-flex;
        align-items: center;
        background: white;
        padding: 12px 24px;
        border-radius: 50px;
        box-shadow: 0 4px 20px rgba(123, 97, 255, 0.15);
      ">
        <span style="
          width: 8px;
          height: 8px;
          background: #7b61ff;
          border-radius: 50%;
          margin-right: 12px;
        "></span>
        <span style="
          font-weight: 600;
          color: #7b61ff;
          font-size: 16px;
        ">${role} Role</span>
      </div>
    </div>
    `
        : ""
    }

    <!-- CTA Button -->
    <div style="text-align: center; margin: 40px 0;">
      <a href="${inviteLink}" 
         style="
           display: inline-block;
           padding: 18px 45px;
           background: linear-gradient(135deg, #7b61ff 0%, #5a43d6 100%);
           color: white;
           text-decoration: none;
           border-radius: 12px;
           font-weight: 600;
           font-size: 16px;
           box-shadow: 0 8px 30px rgba(123, 97, 255, 0.4);
           transition: all 0.3s ease;
           border: none;
           cursor: pointer;
         "
         onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 12px 40px rgba(123, 97, 255, 0.6)';"
         onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 30px rgba(123, 97, 255, 0.4)';"
      >
        🚀 Accept Invitation
      </a>
    </div>
</div>
   `;
}

module.exports = inviteTemplate;
