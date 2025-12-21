const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    branch: {
      type: String,
      required: true,
    },

    graduationYear: {
      type: Number,
      required: true,
    },

    isVssutian: {
      type: Boolean,
      default: false,
    },

    regdNo: {
      type: String,
      default: null,
    },

    college: {
      type: String,
      default: "Non-VSSUT",
    },

    events: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Event",
      },
    ],

    paymentStatus: {
      type: Boolean,
      default: false,
    },

    paymentType: {
      type: Number,
      default: 0,
    },

    ticketGenerated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
