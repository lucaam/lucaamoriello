// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
require('dotenv/config')

app.use(cors());
app.use(bodyParser.json())

// Import routes
const dreamsRoute = require('./routes/dreams')
const authRoute = require('./routes/auth')

app.use('/api/user', authRoute);
app.use('/api/dream', dreamsRoute);

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

//The 404 Route
app.get("*", function (request, response) {
  response.sendFile(__dirname + "/views/404.html");
});

mongoose.connect(
  process.env.DB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true }  ,
  () => console.log("Connected to DB")
);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

//mongodb+srv://lucaamoriello:dg0NKHa5J1TDyI3M@cluster0.1i4dg.mongodb.net/<dbname>?retryWrites=true&w=majority
