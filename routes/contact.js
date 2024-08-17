const express = require("express");
const router = express.Router();
const saveContact = require("../controller/contact.js");

router.post("/contact", saveContact);

module.exports = router;
