const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const Message = require("./model/message");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/messages", (req, res) => {
    Message.find({}, (err, messages) => {
        if (err) {
            console.error(err.message);
        } else {
            res.send(messages);
        }
    })
});

app.post("/messages", (req, res) => {
    const message = new Message(req.body);
    message.save((err) => {
        if (err) {
            res.status(500);
            res.render('error', { error: err });
        } else {
            res.status(200);
        }
    })
});

connectDB();

const server = app.listen(3000, () => {
    console.log("Hola");
});

app.use(express.static(__dirname));