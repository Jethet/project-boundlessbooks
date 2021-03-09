import React from "react";

const BookCard = (props) => {
  return (
    <div className="book-card">
      {/* <img src="#" alt=""/> */}
      <div className="book-details">
        <p>Author: {props.item.author}</p>
        <p>Title: {props.item.title}</p>
        <p>Language: {props.item.language}</p>
      </div>
    </div>
  );
};

export default BookCard;
