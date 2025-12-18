const OTP = require("../../models/otp.models");

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.json({ 
        success: false, 
        message: "Email and OTP are required" });
    }

    const otpRecord = await OTP.findOne({ email });

    if (!otpRecord) {
      return res.json({ 
        success: false, 
        message: "OTP expired or not found. Please resend." });
    }

    if (otpRecord.otp === otp) {
      await OTP.deleteOne({ email }); 
      
      return res.json({ 
        success: true, 
        message: "Email verified successfully!" 
      });
    } else {
      return res.json({ 
        success: false, 
        message: "Invalid OTP. Please check your email." 
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Verification error" });
  }
};

module.exports = verifyOTP;