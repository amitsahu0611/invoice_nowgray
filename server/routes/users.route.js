/** @format */

const express = require("express");
const {
  login,
  createUser,
  getAllStaffs,
  getUserById,
  updateUserById,
} = require("../controllers/users.controller");
const logMiddleware = require("../utils/log");
const verifyToken = require("../utils/verifyToken");
const router = express.Router();

router.post("/login", logMiddleware, login);
router.post("/createUser", verifyToken, logMiddleware, createUser);
router.get("/getAllStaffs/:start", verifyToken, logMiddleware, getAllStaffs);
router.get("/getUserById/:id", verifyToken, logMiddleware, getUserById);
router.put("/updateUsers/:id", verifyToken, logMiddleware, updateUserById);

module.exports = router;
