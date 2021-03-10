const express = require("express");

const app = express();

const PORT = 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"));

app.get("/", (req, res) => res.send("Hello world!"));

app.listen(PORT, () => console.log("Server started on port 3000"));
