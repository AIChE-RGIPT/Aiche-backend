const mongoose = require('mongoose');

mongoose.connect(process.env.DB)
    .then(() => {
        console.log("Database connected Successfully for Registration");
    })
    .catch((error) => {
        console.log("Error connecting to database:", error);
    });

let registrationSchema = mongoose.Schema({
    name: String,
    email: String,
    abstract: String,
    CV: String,
});

let registration = mongoose.model("registration", registrationSchema);

module.exports = registration;
