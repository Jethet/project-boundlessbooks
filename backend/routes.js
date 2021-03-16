const express = require("express");
const Router = express.Router();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PGUSER,
  host: "localhost",
  database: "boundless_books",
  password: process.env.PGPASSWORD,
  port: 5432,
});

Router.route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })

  .get("/overview", (req, res, next) => {
    pool
    .query("SELECT * FROM book_cards;")
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
  })

  .post((req, res, next) => {
    res.send(
      "When a POST request is made, then this " + "is the response sent to the client!"
    );
  })

  .put((req, res, next) => {
    res.send(
      "When a PUT request is made, then this " + "is the response sent to the client!"
    );
  })

  .delete((req, res, next) => {
    res.send(
      "When a DELETE request is made, then this " + "is the response sent to the client!"
    );
  });

module.exports = Router;
