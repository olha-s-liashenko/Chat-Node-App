const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.DB_ACCESS, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err;
    console.log("DB Connected Successfully");
});

const server = app.listen(3000, () => {
    console.log("Hola");
});

app.use(express.static(__dirname));