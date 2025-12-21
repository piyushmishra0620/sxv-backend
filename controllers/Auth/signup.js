const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  try {
    console.log("SIGNUP BODY:", req.body);

    const {
      name,           // from frontend
      email,
      password,
      phone,
      institution,    
      gradYear,
      branch,
    } = req.body;


    if (!name || !email || !password || !phone || !institution || !gradYear || !branch) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    //  Prevent duplicate users
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    //  Hash password
    const hash = await bcrypt.hash(password, 10);

    const isVssutian = institution === "vssut";
    const college = isVssutian ? "VSSUT" : "Non-VSSUT";

    const user = await User.create({
      username: name,
      email,
      password: hash,
      phone,
      branch,
      graduationYear: gradYear,
      isVssutian,
      college,
      regdNo: null,          // optional / future
      events: [],
      paymentStatus: isVssutian,
      paymentType: 0,
    });

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
        isVssutian: user.isVssutian,
        college: user.college,
        graduationYear: user.graduationYear,
        branch: user.branch,
        phone: user.phone,
      },
      process.env.SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      success: true,
      token,
      message: "Registration successful",
    });

  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = signUp;
