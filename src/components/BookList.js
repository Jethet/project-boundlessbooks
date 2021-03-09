import React from "react";
import { useState, useEffect } from "react";
import BookCard from "./BookCard";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("booksData.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBooks(data)        
      })
      .catch((error) => console.log(error))
  }, []);

  return (
    <div>
      <div className="book-overview">
        {books.map((book, index) => (
          <BookCard key={index} item={book} />
          // author={book.author} title={book.title} language={book.language} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
