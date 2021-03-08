import React from "react";

const BookCard = (props) => {
  return (
    <div className="book-card">
      {/* <img src="#" alt=""/> */}
      <div className="book-details">
        <p>Author: {props.author}</p>
        <p>Title: {props.title}</p>
        <p>Language: {props.language}</p>
      </div>
    </div>
  );
};

export default BookCard;
