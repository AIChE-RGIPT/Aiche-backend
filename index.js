require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const contactRouter = require('./routes/contact.js');
const registrationRouter = require('./routes/registration.js');
const buyRouter = require('./routes/buy.js');

let port = process.env.PORT || 5000;

const corsOptions = {
  origin: 'https://aichergipt.com',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  credentials: true
};

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://www.aichergipt.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(cors(corsOptions));
app.use(express.json()); 
app.use("/", contactRouter);
app.use("/", registrationRouter);
app.use("/", buyRouter);


app.listen(port, () => {
    console.log("Server is listening at the port", port);
});
