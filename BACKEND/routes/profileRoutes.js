const express = require("express");
const { getMyProfile, updateMyProfile } = require("../controllers/profileController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", protect, getMyProfile);
router.put("/", protect, updateMyProfile);

module.exports = router;
