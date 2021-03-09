const express = require("express")

const app = express()

const PORT = 3000;

// middleware
app.use(express.json());
app.use(express.static('public'));


app.listen(PORT, () => console.log("Server started on port 3000"))