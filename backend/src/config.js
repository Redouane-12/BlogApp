const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://127.0.0.1:27017/blogApp");


//Connection
connect.then(() => {
    console.log("Connected to the database successfuly");
})
.catch(() => {
    console.error("Error connecting to the database:", error);
})
