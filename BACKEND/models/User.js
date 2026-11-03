const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true, trim: true },
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },

    school: { type: String, trim: true, default: "" },
    course: { type: String, trim: true, default: "" },
    grades: { type: String, trim: true, default: "" },
    hobbies: { type: [String], default: [] },
    bio: { type: String, trim: true, default: "" },

    reviews: { type: [reviewSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
