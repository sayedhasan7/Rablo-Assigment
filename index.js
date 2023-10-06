// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors")
const port = process.env.PORT || 2000;
const dbUrl = process.env.DB_URL || '';
const Connnection = require("./Connection")
app.use(bodyParser.json());
require('dotenv').config();
app.use(cors())


Connnection(dbUrl)

app.use('/api/products', require("./api/ProductRoutes"));
app.use('/api/signin', require("./api/Login"));
app.use('/api/signup', require("./api/Signup"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
