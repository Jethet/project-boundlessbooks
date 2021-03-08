import React from "react";
import BookCard from "./BookCard";
import { useState, useEffect } from "react";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://example.com")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setBooks(data.results);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <div className="book-overview">
        {books.map((book) => (
          <BookCard
            
          />
        ))}
      </div>
    </div>
  );
};

export default BookList;
