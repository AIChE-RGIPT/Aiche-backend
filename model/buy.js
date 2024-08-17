const mongoose = require('mongoose');

mongoose.connect(process.env.DB)
    .then(() => {
        console.log("Database connected Successfully for purshasing merchandise");
    })
    .catch((error) => {
        console.log("Error connecting to database:", error);
    });

let buySchema = mongoose.Schema({
    name: String,
    email: String,
    contact:Number,
});

let buy = new mongoose.model("buy", buySchema);

module.exports = buy; 