const express = require("express");
const route = require('./routes')
require("dotenv").config();

const app = express();

const PORT = 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(route);
app.use(express.static("public"));

app.get("/", (req, res) => res.send("Hello world!"));

app.listen(PORT, () => console.log("Server started on port 3001"));
