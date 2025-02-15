const nodemailer = require("nodemailer");

const sendOTPVerification = async (req, res, next) => {

  const email = await req.body.email
  // console.log(req.body.email, email)
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  if (email.length > 0) {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const date = new Date()

    const mailOption = {
      from: process.env.EMAIL,
      to: await email,
      subject: "Verify your Email",
      html: `
     <html>
     <body>
     <div
     class="otp"
     style="
       height: fit-content;
       width: fit-content;
       border-radius: 10px;
       color: #ffffff;
       font-size: 20px;
       padding: 20px 50px;
       text-align: center;
       font-family: ''Courier New', Courier, monospace';
     "
     >
       <div style="display: flex;justify-content:center; margin-bottom:10px;">
         
         <img
           src="https://drive.google.com/thumbnail?sz=w1000&id=1fF1bNQykjxloIukAnPlaU4th7lJhgqbW"
           alt=""
           style="height: 60px;margin-right:60px;"
         />
         <a href="https://dev.enigmavssut.com/" target="_blank">
             <img
               src="https://drive.google.com/thumbnail?sz=w1000&id=1ObGs4jVe8QCoWaSkBo4KuL7ZfHFFbU_X"
               alt=""
               style="height: 70px;"
             />
           </a>
       </div>
       <h3 style="color: black">YOUR OTP FOR REGISTRATION IS</h3>
       <h1 style="color: black">
         <span
           style="padding: 5px; border-radius: 5px"
           >${otp}</span
         >
       </h1>
     
      
     </div>
   </body>
      </html>

      `,
    };

    await transporter
      .sendMail(mailOption)
      .then(() => {
        res.json({
          otp: otp,
          message: `Verification OTP sent to ${email}`,
          success: true,
        })
      })
      .catch((error) => {
        res.json({
          err: error.message,
          message: "Error occured internally",
          success: false,
        });

      });
  } else {
    res.json({
      status: "failed",
      message: "Verification OTP is not sent!",
      success: false,
    });
  }
};

module.exports = sendOTPVerification;
