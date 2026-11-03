const bcrypt = require("bcryptjs");
const User = require("../models/User");

const seedAdmin = async () => {
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.warn("ADMIN_EMAIL/ADMIN_PASSWORD not set, skipping admin bootstrap");
    return;
  }

  const email = ADMIN_EMAIL.toLowerCase();
  const existing = await User.findOne({ email });

  if (existing) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

  await User.create({
    name: ADMIN_NAME || "Admin",
    email,
    password: hashedPassword,
    role: "admin",
  });

  console.log(`Bootstrap admin created: ${email}`);
};

module.exports = seedAdmin;
