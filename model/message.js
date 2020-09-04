const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    name: String,
    text: String
});

module.exports = Message = mongoose.model("message", MessageSchema);