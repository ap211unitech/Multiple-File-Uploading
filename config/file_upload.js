const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/comments", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log("DB connected"));

const schema = new mongoose.Schema({
    abstract: { type: String, required: true },
    newfile: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    authors: { type: Array, required: true }
})

module.exports = mongoose.model("file", schema);