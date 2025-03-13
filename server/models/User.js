const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
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
      select: false,
    },
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "event",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
