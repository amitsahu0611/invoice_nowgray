/** @format */

const express = require("express");
const {
  login,
  createUser,
  getAllStaffs,
  getUserById,
  updateUserById,
} = require("../controllers/users.controller");
const router = express.Router();

router.post("/login", login);
router.post("/createUser", createUser);
router.get("/getAllStaffs", getAllStaffs);
router.get("/getUserById/:id", getUserById);
router.put("/updateUsers/:id", updateUserById);

module.exports = router;
