const express = require("express");
const { getAllStudents, getStudentById, addReview } = require("../controllers/adminController");
const { protect, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.use(protect, isAdmin);

router.get("/students", getAllStudents);
router.get("/students/:id", getStudentById);
router.post("/students/:id/reviews", addReview);

module.exports = router;
