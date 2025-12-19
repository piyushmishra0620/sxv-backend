const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields must be filled",
      });
    }

    // 2️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not registered",
      });
    }

    // 3️⃣ SAFETY CHECK (THIS PREVENTS 504)
    if (!user.password) {
      return res.status(500).json({
        success: false,
        message: "Password not set for this account",
      });
    }

    // 4️⃣ Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // 5️⃣ Generate token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
        isVssutian: user.isVssutian,
        regdNo: user.regdNo,
        events: user.events,
        college: user.college,
        graduationYear: user.graduationYear,
        branch: user.branch,
        paymentStatus: user.paymentStatus,
        phone: user.phone,
      },
      process.env.SECRET,
      { expiresIn: "7d" }
    );

    // 6️⃣ SUCCESS RESPONSE
    return res.json({
      success: true,
      token,
      message: "Login successful",
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Problem occurred internally",
    });
  }
};

module.exports = login;
