const express = require("express");
const router = express.Router();
const buyContact = require("../controller/buy.js");

router.post("/buy", buyContact);

module.exports = router;
