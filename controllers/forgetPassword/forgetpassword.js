const User = require('../../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sendEmail = require('../../helper/mailer.js');

const forgetpasswords = async (req, res) => {
    try {
        const email  = req.body.email;
        if (!email || email === "") {
            return res.status(400).json({ error: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // send email
        await sendEmail(email, user?._id );

        return res.status(200).json({ message: "Password reset email sent successfully" });
    } catch (error) {
        console.error("Error occurred in forgotpassword route:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = forgetpasswords;
