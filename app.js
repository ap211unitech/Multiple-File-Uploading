const express = require("express");
const app = express();
const bodyparser = require("body-parser");


//MiddleWares
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use("/uploads", express.static("./uploads"));


//End points
app.use("/", require("./routes/file_upload"));

//Run Server
app.listen(8000, () => {
    console.log("Server running at port 80");
});

