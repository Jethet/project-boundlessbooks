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

// AUTHORS
// get all authors
router.get("/authors", (req, res) => {
  pool
    .query("SELECT * FROM authors;")
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

// get author by last name
router.get("/authors/last", (req, res) => {
  const lastname = req.query.name;
  pool
    .query("SELECT * FROM authors WHERE lastname=$1;", [lastname])
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

// get author by first name
router.get("/authors/first", (req, res) => {
  const firstname = req.query.name;
  
  pool
    .query("SELECT * FROM authors WHERE firstname=$1;", [firstname])
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

// get author by author id
router.get("/authors/:id", (req, res) => {
  const authorId = req.params.id;
  pool
    .query("SELECT * FROM authors WHERE id=$1;", [authorId])
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

// add new author
router.post("/authors/new", (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  pool
    .query("INSERT INTO authors (firstname, lastname) VALUES ($1, $2);", [firstname, lastname])
    .then(() => res.send(`New item ${firstname} ${lastname} has been created.`))
    .catch((e) => console.error(e));
});

// edit author firstname/lastname
router.put("/authors/:id", (req, res) => {
  const authorId = parseInt(req.params.id)
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  // The bookId is not added in the database:
  const bookId = req.params.book_id
  pool
  .query("UPDATE authors SET firstname=$1, lastname=$2, book_id=$3 WHERE id=$4;", [firstname, lastname, bookId, authorId])
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

// BOOKS
// get all books
router.get("/books", (req, res) => {
  pool
    .query("SELECT * FROM books;")
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

// get book by word in title
// router.get("/books/title", (req, res) => {
//   const titlePart = req.query.title;
//   pool
//     .query("SELECT * FROM books WHERE title LIKE $1;", [titlePart])
//     .then((result) => res.json(result.rows))
//     .catch((e) => console.error(e));
// });


// get book by book id
router.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  pool
    .query("SELECT * FROM books WHERE id=$1;", [bookId])
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

// add new book title
router.post("/books/new", (req, res) => {
  const title = req.body.title;
  const language = req.body.language;
  // the authorId returns error NaN
  const authorId = req.params.author_id
  pool
    .query("INSERT INTO books (title, language, author_id) VALUES ($1, $2, $3);", [title, language, authorId])
    .then(() => res.send(`New book with title ${title} has been created.`))
    .catch((e) => console.error(e));
});

// edit author firstname/lastname/book title
router.put("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id)
  const title = req.body.title;
  const language = req.body.language;
  // cannot add author_id: error NaN
  const authorId = parseInt(req.params.author)
  pool
  .query("UPDATE books SET title=$1, language=$2, author_id=$3 WHERE id=$4;", [title, language, authorId, bookId])
  .then(() => res.send(`Book details for ${title} have been updated.`))
  .catch((e) => console.error(e));
});

// delete author
router.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  pool
    .query("DELETE FROM books WHERE id = $1", [bookId])
    .then(() => res.send(`Book with id ${bookId} has been deleted.`))
    .catch((e) => console.error(e));
});

module.exports = router;
