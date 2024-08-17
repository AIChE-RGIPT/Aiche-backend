const express = require("express");
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const saveRegistration = require("../controller/registration.js");

// Ensure the CV directory exists
const cvDirectory = path.resolve(__dirname, '../CV');
if (!fs.existsSync(cvDirectory)) {
    fs.mkdirSync(cvDirectory, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(`Saving file to: ${cvDirectory}`);
        cb(null, cvDirectory);
    },
    filename: function (req, file, cb) {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        console.log(`Generated filename: ${uniqueName}`);
        cb(null, uniqueName);
    },
});

const upload = multer({ storage: storage });

router.post('/registration', upload.single('CV'), (req, res, next) => {
    console.log('File uploaded:', req.file);
    saveRegistration(req, res, next);
});

module.exports = router;
