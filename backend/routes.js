const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PGUSER,
  host: "localhost",
  database: "boundless_books",
  password: process.env.PGPASSWORD,
  port: 5432,
});

// define the home route
router.get("/", function (req, res) {
  res.send("This is the homepage");
});

router.get("/overview", (req, res) => {
  pool
    .query("SELECT * FROM book_cards;")
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

router.get("/search", (req, res) => {
  // pool
  //   .query("SELECT * FROM book_cards;")
  //   .then((result) => res.json(result.rows))
  //   .catch((e) => console.error(e));
});

router.post((req, res) => {
  res.send(
    "When a POST request is made, then this " + "is the response sent to the client!"
  );
});

router.put((req, res) => {
  res.send(
    "When a PUT request is made, then this " + "is the response sent to the client!"
  );
});

router.delete((req, res) => {
  res.send(
    "When a DELETE request is made, then this " + "is the response sent to the client!"
  );
});

module.exports = router;
