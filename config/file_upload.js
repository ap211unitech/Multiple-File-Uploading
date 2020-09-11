const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/comments", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log("DB connected"));

const schema = new mongoose.Schema({
    abstract: { type: String, required: true },
    manuscript: { type: String, required: true },
    figurefiles: { type: String, required: true },
    graphs: { type: String, required: true },
    email: { type: String, required: true },
    coverletters: { type: String, required: true },
    coauthors: { type: Array, required: true },
    status: { type: String, default: "pending" }
})

module.exports = mongoose.model("file", schema);