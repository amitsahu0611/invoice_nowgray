/** @format */

const express = require("express");
const {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
} = require("../controllers/Client.controller");

const router = express.Router();

router.post("/createClient", createClient);
router.get("/getAllClients/:start", getAllClients);
router.get("/getClientById/:id", getClientById);
router.put("/updateClient/:id", updateClient);

module.exports = router;
