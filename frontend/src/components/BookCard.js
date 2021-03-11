import React from "react";

const BookCard = (props) => {
  return (
    <div className="book-card">
      {/* <img src="#" alt=""/> */}
      <div className="book-details">
        <p className="hidden-id">Id: {props.item.id}</p>
        <p>
          <strong>Author: {props.item.author}</strong>
        </p>
        <p>Title: {props.item.title}</p>
        <p>Language: {props.item.language}</p>
      </div>
      <div className="book-cover">
        <img src="#" alt="Book cover" />
      </div>
    </div>
  );
};

export default BookCard;
