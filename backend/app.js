const express = require("express");
const app = express();
require("./src/config")
require("dotenv").config();
const cors = require("cors");


const apiRoutes = require('./routes/api');

const PORT = process.env.PORT || 3003;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Routes


app.use('/',apiRoutes)

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to Your Blog App");
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
