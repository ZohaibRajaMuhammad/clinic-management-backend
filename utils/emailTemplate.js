// const generateInviteEmail = ({ companyName, role,  companyLogo, link, inviteBy }) => {
//   return `
//     <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ccc; border-radius: 10px;">
//       <img src="${companyLogo}" alt="Company Logo" style="width: 100px; margin-inline: auto; height: 80px; object-fit: cover; border-radius: 10px 10px 0 0;" />
//       <h1>${companyName}</h1>
//       <h2 style="color: #333;">You're invited to join as an ${role} IN ${companyName}!</h2>
//       <p>This ${companyName} is the world fastest growing complany right now</p>
//       <a href="${link}" style="display: inline-block; margin-top: 20px; background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
//         Verify
//       </a>

//       <h1>Invited By: ${inviteBy}</h1>
//     </div>
//   `;
// };

// module.exports = { generateInviteEmail };


// New Template --------

const generateInviteEmail = ({ companyName, role, companyLogo, link, inviteBy }) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(139,92,246,0.2);">
      
      <!-- Purple Gradient Header Wave -->
      <div style="position: relative; height: 180px; background: linear-gradient(135deg, #8B5CF6 0%, #A855F7 50%, #C084FC 100%); overflow: hidden;">
        <!-- Decorative Wave -->
        <svg style="position: absolute; bottom: 0; left: 0; width: 100%; height: 60px;" viewBox="0 0 600 60" fill="none">
          <path d="M0 20C150 5 300 35 450 15C500 10 550 25 600 20V60H0V20Z" fill="rgba(255,255,255,0.2)"/>
          <path d="M0 30C120 15 240 45 360 25C420 20 480 35 600 30V60H0V30Z" fill="rgba(255,255,255,0.1)"/>
        </svg>
      </div>

      <!-- Company Logo Section -->
      <div style="text-align: center; margin-top: -90px; position: relative; z-index: 10;">
        <div style="display: inline-block; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); border-radius: 20px; padding: 20px; border: 3px solid rgba(139,92,246,0.2); box-shadow: 0 8px 25px rgba(139,92,246,0.15);">
          <img src="${companyLogo}" alt="${companyName}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 15px; border: 3px solid #E6E2FC;" />
          <div style="margin-top: 8px; color: #8B5CF6; font-weight: bold; font-size: 14px;">${companyName}</div>
        </div>
      </div>

      <!-- Decorative Diamond Elements -->
      <div style="text-align: center; margin: 25px 0;">
        <div style="display: inline-flex; gap: 8px; align-items: center;">
          <div style="width: 16px; height: 16px; background: linear-gradient(45deg, #8B5CF6, #A855F7); transform: rotate(45deg); border-radius: 3px;"></div>
          <div style="width: 20px; height: 20px; background: linear-gradient(45deg, #A855F7, #C084FC); transform: rotate(45deg); border-radius: 4px;"></div>
          <div style="width: 16px; height: 16px; background: linear-gradient(45deg, #C084FC, #DDD6FE); transform: rotate(45deg); border-radius: 3px;"></div>
        </div>
      </div>

      <!-- Main Content -->
      <div style="padding: 30px 40px;">
        
        <!-- Welcome Heading -->
        <h1 style="color: #4B5563; font-size: 32px; font-weight: bold; text-align: center; margin: 0 0 20px 0; line-height: 1.2;">
          Welcome to the team,<br>
          <span style="color: #8B5CF6;">[${role}]!</span>
        </h1>

        <!-- Greeting -->
        <p style="color: #6B7280; font-size: 16px; font-style: italic; margin: 20px 0;">
          Hi User
        </p>

        <!-- Main Message -->
        <p style="color: #6B7280; font-size: 16px; line-height: 1.6; margin: 20px 0;">
          We're thrilled to have you can  join our team as <strong style="color: #8B5CF6;">[${role}]</strong>. 
          Number of Years of experience working in 
           Industry and we can't wait to see what they'll bring to our team.
        </p>

        <!-- Personal Touch -->
        <p style="color: #6B7280; font-size: 16px; line-height: 1.6; margin: 20px 0;">
          Outside of Your's professional experience, they also enjoy 
          hobbies. In
          <strong style="color: #8B5CF6;">[${companyName}]</strong> We welcome the next time you see them. Welcome to the 
          team.
        </p>

        <!-- Verify Button -->
        <div style="text-align: center; margin: 40px 0;">
          <a href="${link}" style="display: inline-block; background: linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%); color: white; padding: 15px 35px; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px; box-shadow: 0 8px 20px rgba(139,92,246,0.3); transition: all 0.3s ease;">
            Verify Account
          </a>
        </div>

        <!-- Closing -->
        <p style="color: #6B7280; font-size: 16px; font-style: italic; margin: 30px 0 10px 0;">
          Kindly,
        </p>

        <!-- Invited By -->
        <div style="background: linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%); border-left: 4px solid #8B5CF6; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <p style="color: #8B5CF6; font-weight: bold; font-size: 18px; margin: 0;">
            Invited By: ${inviteBy}
          </p>
          <p style="color: #6B7280; font-size: 14px; margin: 5px 0 0 0;">
            ${companyName} Team
          </p>
        </div>

      </div>

      <!-- Footer -->
      <div style="background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%); padding: 20px; text-align: center; border-top: 1px solid #E6E2FC;">
        <p style="color: #9CA3AF; font-size: 12px; margin: 0;">
          © 2024 ${companyName}. All rights reserved.
        </p>
      </div>

    </div>
  `;
};

module.exports = { generateInviteEmail };
