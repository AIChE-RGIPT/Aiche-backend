require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const contactRouter = require('./routes/contact.js');
const registrationRouter = require('./routes/registration.js');
const buyRouter = require('./routes/buy.js');

let port = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()); 
app.use("/", contactRouter);
app.use("/", registrationRouter);
app.use("/", buyRouter);


app.listen(port, () => {
    console.log("Server is listening at the port", port);
});
