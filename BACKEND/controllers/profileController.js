const User = require("../models/User");

const PROFILE_FIELDS = ["school", "course", "grades", "hobbies", "bio"];

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
});

const getMyProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({ profile: toProfileView(user) });
};

const updateMyProfile = async (req, res) => {
  try {
    const updates = {};
    for (const field of PROFILE_FIELDS) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    });

    res.json({ profile: toProfileView(user) });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getMyProfile, updateMyProfile };
