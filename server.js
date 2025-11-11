const express = require("express");
const app = express();

require("dotenv").config();
const cors = require("cors");

let dbConnect = require("./config/db");
const appRoutes = require("./routes/index");
const sendMail = require("./utils/mailer");
const appointmentTemplate = require("./utils/appointmentTemplate");
const inviteTemplate = require("./utils/inviteTemplate");

app.use(express.json());
app.use(
  cors()
);

// database connect
dbConnect(process.env.MONGO_URI);




app.use('/api', appRoutes);



// app.get('/emailTester', async (req, res) => {
//    try {
//     // const  { subject, html } = appointmentTemplate("confirmed",  {
//     //   doctorName: "TEST",
//     //   patientName: "Test",
//     //   appointmentDate: "Test",
//     //   startAt: "10pm",
//     //   endAt: "2pm",
//     //   day: "appointmentDay",
//     // })

//      const html = inviteTemplate("name", "role", "inviteLink");

//     await sendMail({
//       to: "ahmedmoizawan007@gmail.com", // Dev Mode
//       subject : "You are invited to join as ${role}",
//       html,
//     });

//     res.send('sucess')
     
//    } catch (error) {
   
    
//    }
// } )


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is ruuning in ${PORT}`));
