function resetPasswordTempl(name, link) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
      <h2 style="color: #2b2b2b;">Reset Your Password</h2>
      <p>Hi ${name},</p>
      <p>Tap the button below to reset your customer account password.</p>
      <p>If you didn’t request a new password, you can safely delete this email.</p>

      <a href="${link}" 
         style="display: inline-block; padding: 12px 25px; background-color: #7b61ff; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 15px;">
         Reset Password
      </a>

      <p style="margin-top: 30px; font-size: 14px;">
        If that doesn’t work, copy and paste the following link in your browser:<br>
        <a href="${link}" style="color: #7b61ff;">${link}</a>
      </p>

      <p style="margin-top: 40px; font-weight: bold;">The HRMS Team.</p>
    </div>
  `;
}

module.exports = resetPasswordTempl