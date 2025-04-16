/** @format */

const express = require("express");
const {
  login,
  createUser,
  getAllStaffs,
} = require("../controllers/users.controller");
const router = express.Router();

router.post("/login", login);
router.post("/createUser", createUser);
router.get("/getAllStaffs", getAllStaffs);

module.exports = router;
