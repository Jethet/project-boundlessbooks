const express = require("express");
const router = express.Router();
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});


// define the home route
router.get("/", function (req, res) {
  res.send("This is the homepage");
});

// AUTHORS
// get all authors
router.get("/authors", (req, res) => {
  client.connect()
  client
    .query("SELECT * FROM authors;")
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e))
    .then(() => client.end());
});

// router.get("/authors", (req, res1) => {
//   client.query("SELECT * FROM authors;", (err, res) => {
//     if (err) throw err;
//     let result = "";
//     for (let row of res.rows) {
//       result = result + JSON.stringify(row);
//     }
//     client.end();
//     res1.send(result);
//   });
// });

// get author by last name
router.get("/authors/last", (req, res) => {
  client.connect()
  const lastname = req.query.name;
  client
    .query("SELECT * FROM authors WHERE lastname=$1;", [lastname])
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e))
    .then(() => client.end())
});

// // get author by first name
router.get("/authors/first", (req, res) => {
  client.connect()
  const firstname = req.query.name;
  client
    .query("SELECT * FROM authors WHERE firstname=$1;", [firstname])
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e))
    .then(() => client.end())
});

// // get author by author id
router.get("/authors/:id", (req, res) => {
  // const authorId = parseInt(req.params.id);
  client.connect()
  const authorId = req.params.id;
  client
    .query("SELECT * FROM authors WHERE id=$1;", [authorId])
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e))
    .then(() => client.end())
});

// // get author and their books by author id
router.get("/authorbooks/:id", (req, res) => {
  client.connect()
  const authorId = req.params.id;
  client
    .query(
      "SELECT authors.firstname, authors.lastname, books.title FROM authors, books WHERE authors.id=books.author_id AND authors.id=$1;",
      [authorId]
    )
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e))
    .then(() => client.end())
});

// add new author
// router.post("/authors/new", (req, res) => {
//   const firstname = req.body.firstname;
//   const lastname = req.body.lastname;
//   client
//     .query("INSERT INTO authors (firstname, lastname) VALUES ($1, $2);", [
//       firstname,
//       lastname,
//     ])
//     .then(() => res.send(`New item ${firstname} ${lastname} has been created.`))
//     .catch((e) => console.error(e));
// });

// // edit author firstname/lastname
// router.put("/authors/:id", (req, res) => {
//   const authorId = parseInt(req.params.id);
//   const firstname = req.body.firstname;
//   const lastname = req.body.lastname;
//   // The bookId is not added in the database:
//   const bookId = req.params.book_id;
//   client
//     .query("UPDATE authors SET firstname=$1, lastname=$2, book_id=$3 WHERE id=$4;", [
//       firstname,
//       lastname,
//       bookId,
//       authorId,
//     ])
//     .then(() => res.send(`Author details have been updated: ${firstname} ${lastname}.`))
//     .catch((e) => console.error(e));
// });

// // delete author
// router.delete("/authors/:id", (req, res) => {
//   const authorId = req.params.id;
//   client
//     .query("DELETE FROM authors WHERE id = $1", [authorId])
//     .then(() => res.send(`Author with id ${authorId} has been deleted.`))
//     .catch((e) => console.error(e));
// });

// BOOKS
// get all books
router.get("/books", (req, res) => {
  client.connect()
  client
    .query("SELECT * FROM books;")
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e))
    .then(() => client.end())
});

// get book by book id
router.get("/books/:id", (req, res) => {
  client.connect()
  const bookId = req.params.id;
  client
    .query("SELECT * FROM books WHERE id=$1;", [bookId])
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e))
    .then(() => client.end())
});

// get book by word in title
router.get("/books/title", (req, res) => {
  client.connect()
  const word = req.query.word;
  client
    .query("SELECT * FROM books WHERE title LIKE $1;", ['%' + word + '%'])
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e))
    .then(() => client.end())
});


// add new book title
router.post("/books/new", (req, res) => {
  client.connect()
  const title = req.body.title;
  const language = req.body.language;
  // the authorId is not added to the books table
  // const authorId = req.body.author_id
  client
    .query("INSERT INTO books (title, language) VALUES ($1, $2);", [title, language])
    .then(() => res.send(`New book with title ${title} has been created.`))
    .catch((e) => console.error(e))
    .then(() => client.end())
});

// // edit author firstname/lastname/booktitle ??
// router.put("/books/:id", (req, res) => {
//   const bookId = parseInt(req.params.id);
//   const title = req.body.title;
//   const language = req.body.language;
//   // cannot add author_id: error NaN
//   // const authorId = parseInt(req.params.author)
//   client
//     .query("UPDATE books SET title=$1, language=$2 WHERE id=$3;", [
//       title,
//       language,
//       bookId,
//     ])
//     .then(() => res.send(`Book details for ${title} have been updated.`))
//     .catch((e) => console.error(e));
// });

// // delete book
// router.delete("/books/:id", (req, res) => {
//   const bookId = req.params.id;
//   client
//     .query("DELETE FROM books WHERE id = $1", [bookId])
//     .then(() => res.send(`Book with id ${bookId} has been deleted.`))
//     .catch((e) => console.error(e));
// });

module.exports = router;
