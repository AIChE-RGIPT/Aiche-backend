const mongoose = require('mongoose');

mongoose.connect(process.env.DB)
    .then(() => {
        console.log("Database connected Successfully for contact information");
    })
    .catch((error) => {
        console.log("Error connecting to database:", error);
    });

let contactSchema = mongoose.Schema({
    name : String,
    email : String,
    subject : String,
    message : String,
});

let contact = new mongoose.model("contact", contactSchema);

module.exports = contact ; 