const express = require("express");
var cors = require('cors')
const route = require('./routes')
require("dotenv").config();

const app = express();
app.use(cors())
const PORT = process.env.PORT;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(route);
app.use(express.static("public"));

app.get("/", (req, res) => res.send("Hello world!"));

app.listen(PORT, () => console.log(`Server started listening on ${PORT}`));
