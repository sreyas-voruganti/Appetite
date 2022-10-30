const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["user", "restaurant"],
      required: true,
    },
    // restaurant only fields
    business_name: String,
    business_address: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
