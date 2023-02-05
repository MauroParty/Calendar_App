// Dependencies
const express = require('express');
const path = require('path');

const cors = require('cors');
const dbConnection = require("./database/config");

require("dotenv").config();

// Server
const app = express();

// MongoDB Database
dbConnection();

// Cors
app.use(cors());
// Public path
app.use(express.static("public"));
// Read and parse body
app.use(express.json());


// Routes
app.get("/*",(req,res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// Listening PORT
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});