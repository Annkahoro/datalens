const User = require("../models/User");

const toProfileView = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  school: user.school,
  course: user.course,
  grades: user.grades,
  hobbies: user.hobbies,
  bio: user.bio,
  reviews: user.reviews,
  createdAt: user.createdAt,
});

const getAllStudents = async (req, res) => {
  const users = await User.find({ role: "user" }).sort({ createdAt: -1 });
  res.json({ students: users.map(toProfileView) });
};

const getStudentById = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id, role: "user" });
  if (!user) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.json({ student: toProfileView(user) });
};

const addReview = async (req, res) => {
  try {
    const { comment } = req.body;
    if (!comment || !comment.trim()) {
      return res.status(400).json({ message: "Review comment is required" });
    }

    const user = await User.findOne({ _id: req.params.id, role: "user" });
    if (!user) {
      return res.status(404).json({ message: "Student not found" });
    }

    user.reviews.push({ comment: comment.trim(), reviewer: req.user._id });
    await user.save();

    res.status(201).json({ student: toProfileView(user) });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getAllStudents, getStudentById, addReview };
