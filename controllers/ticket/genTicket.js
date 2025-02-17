const User = require("../../models/user");
const nodemailer = require("nodemailer");

const genTicket = (req, res, next) => {
  const userId = req.user.userId;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  User.findById(userId)
    .then(async (user) => {
      if (user.isVssutian) {
        res.json({
          success: true,
          message: "VSSUTians do not require pass for the fest",
        });
      } else {
        if (!user.paymentStatus) {
          res.json({
            success: false,
            message:
              "Oops!! It seems like you have not completed the payment process. Check your email for the payment process. If you have completed your payment and facing any issues contact us",
          });
        }
        if (user.paymentStatus && user.ticketGenerated) {
          res.json({
            success: true,
            message:
              "The ticket has been sent to your email. Kindly check your email. If you are facing any issue contact us.",
          });
        }
        if (user.paymentStatus && !user.ticketGenerated) {
          if (user.paymentType === 2) {
            const mailOption = {
              from: process.env.EMAIL,
              to: user.email,
              subject: "Entry Pass",
              html: `<!DOCTYPE html>
              <html lang="en">
              
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Entry Pass</title>
              </head>
              
              <body style="
                                          width: 650px;margin: 30px 100px;">
                  <div style="display: flex;
                                              justify-content: center;
                                              width: 100%;
                                              height: 100%;">
              
                      <img src="https://res.cloudinary.com/dlm8mel1x/image/upload/v1739813189/sxv/hfm2yuqb9ojsjajsc6r2.png" alt="Logo" style="width: 500px;
                                                      height: 250px;">
              
                      <div style="background:  #099396;height: 250px;min-width:250px;justify-content: center;">
                          <div style="background: #F9EFD7;padding: 59px 0px;
                                                      margin: 30px;
                                              text-align: center;border-radius: 20px 0px;">
                              <p style="font-size: 22px; color: #099396; margin: 0;">${user.username}</p>
                              <p style="font-size: 16px; color: #099396; margin: 0;">${user.college}</p>
                              <p style="font-size: 12px; font-weight: 600;color: #099396; margin: 0">${user._id}</p>
                          </div>
                      </div>
                  </div>
              </body>
              
              </html>`,
            };

            await transporter.sendMail(mailOption).then(() => {
              User.findByIdAndUpdate(userId, { ticketGenerated: true }).then(
                () => {
                  res.json({
                    success: true,
                    message:
                      "Your ticket for Samavesh X Vassaunt 2024 has been sent to your email.",
                  });
                }
              );
            });
          } 
          else if (user.paymentType === 3) {
            const mailOption = {
              from: process.env.EMAIL,
              to: user.email,
              subject: "Entry Pass",
              html: `<!DOCTYPE html>
              <html lang="en">
              
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Entry Pass</title>
              </head>
              
              <body style="
                                          width: 650px;margin: 30px 100px;">
                  <div style="display: flex;
                                              justify-content: center;
                                              width: 100%;
                                              height: 100%;">
              
                      <img src="https://res.cloudinary.com/dlm8mel1x/image/upload/v1739813189/sxv/hfm2yuqb9ojsjajsc6r2.png" alt="Logo" style="width: 500px;
                                                      height: 250px;">
              
                      <div style="background:  #D15F5F;height: 250px;min-width:250px;justify-content: center;">
                          <div style="background: #F9EFD7;padding: 59px 0px;
                                                      margin: 30px;
                                              text-align: center;border-radius: 20px 0px;">
                              <p style="font-size: 22px; color: #D15F5F; margin: 0;">${user.username}</p>
                              <p style="font-size: 16px; color: #D15F5F; margin: 0;">${user.college}</p>
                              <p style="font-size: 12px; font-weight: 600;color: #D15F5F; margin: 0">${user._id}</p>
                          </div>
                      </div>
                  </div>
              </body>
              
              </html>`,
            };

            await transporter.sendMail(mailOption).then(() => {
              User.findByIdAndUpdate(userId, { ticketGenerated: true }).then(
                () => {
                  res.json({
                    success: true,
                    message:
                      "Your ticket for Samavesh X Vassaunt 2024 has been sent to your email.",
                  });
                }
              );
            });
          } 

          else if (user.paymentType === 1) {
            const mailOption = {
              from: process.env.EMAIL,
              to: user.email,
              subject: "Entry Pass",
              html: `<!DOCTYPE html>
              <html lang="en">
              
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Entry Pass</title>
              </head>
              
              <body style="
                                          width: 650px;margin: 30px 100px;">
                  <div style="display: flex;
                                              justify-content: center;
                                              width: 100%;
                                              height: 100%;">
              
                      <img src="https://res.cloudinary.com/dlm8mel1x/image/upload/v1739813189/sxv/hfm2yuqb9ojsjajsc6r2.png" alt="Logo" style="width: 500px;
                                                      height: 250px;">
              
                      <div style="background:  #9B2227;height: 250px;min-width:250px;justify-content: center;">
                          <div style="background: #F9EFD7;padding: 59px 0px;
                                                      margin: 30px;
                                              text-align: center;border-radius: 20px 0px;">
                              <p style="font-size: 22px; color: #9B2227; margin: 0;">${user.username}</p>
                              <p style="font-size: 16px; color: #9B2227; margin: 0;">${user.college}</p>
                              <p style="font-size: 12px; font-weight: 600;color: #9B2227; margin: 0">${user._id}</p>
                          </div>
                      </div>
                  </div>
              </body>
              
              </html>`,
            };

            await transporter.sendMail(mailOption).then(() => {
              User.findByIdAndUpdate(userId, { ticketGenerated: true }).then(
                () => {
                  res.json({
                    success: true,
                    message:
                      "Your ticket for Samavesh X Vassaunt 2024 has been sent to your email.",
                  });
                }
              );
            });
          }
        }
      }
    })
    .catch((err) => {
      res.json({
        success: false,
        message: "Something went wrong! Don't worry we are working on it",
        error: err.message,
      });
    });
};

module.exports = genTicket;
