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

// get all authors
router.get("/authors", (req, res) => {
  pool
    .query("SELECT * FROM authors;")
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

// get author by last name
router.get("/author/last", (req, res) => {
  const lastname = req.query.name;
  pool
    .query("SELECT * FROM authors WHERE lastname=$1;", [lastname])
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

// get author by first name
router.get("/author/first", (req, res) => {
  const firstname = req.query.name;
  
  pool
    .query("SELECT * FROM authors WHERE firstname=$1;", [firstname])
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

// get author by author id
router.get("/authors/:id", (req, res) => {
  const authorId = parseInt(req.params.id);
  pool
    .query("SELECT * FROM authors WHERE id=$1;", [authorId])
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

// add new author and book title
router.post("/author/new", (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  pool
    .query("INSERT INTO authors (firstname, lastname) VALUES ($1, $2);", [firstname, lastname])
    .then(() => res.send(`New item ${firstname} ${lastname} has been created.`))
    .catch((e) => console.error(e));
});

// edit author firstname/lastname/book title
router.put("/author/:id", (req, res) => {
  const authorId = parseInt(req.params.id)
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  pool
  .query("UPDATE authors SET firstname=$1, lastname=$2 WHERE id=$3;", [firstname, lastname, authorId])
  .then(() => res.send(`Author details have been updated: ${firstname} ${lastname}.`))
  .catch((e) => console.error(e));
});

// delete author
router.delete("/authors/:id", (req, res) => {
  const authorId = req.params.id;
  pool
    .query("DELETE FROM authors WHERE id = $1", [authorId])
    .then(() => res.send(`Author with id ${authorId} has been deleted.`))
    .catch((e) => console.error(e));
});

module.exports = router;
