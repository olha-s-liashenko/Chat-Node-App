const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const Message = require("./model/message");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get("/messages", (req, res) => {
    Message.find({}, (err, messages) => {
        if (err) {
            console.error(err.message);
        } else {
            res.send(JSON.stringify(messages));
        }
    })
});

connectDB();

const server = app.listen(3000, () => {
    console.log("Hola");
});

var io = require('socket.io').listen(server);

io.on("connection", (socket) => {
    console.log("User is connected");
    socket.on("message", (message) => {
        console.log("message received:");
        console.log(message);
        io.emit("message", message);
        const messageToSave = new Message({
            name: message.name,
            text: message.text
        });
        messageToSave.save((err) => {
            if (err) {
                res.status(500);
                res.render('error', { error: err });
            }
        })
    })    
})

app.use(express.static(__dirname));