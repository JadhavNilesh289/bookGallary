import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({
    BookTitle: "",
    BookDesc: "",
    BookCover: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/books", book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(book);

  return (
    <div className="form">
      <h1>Add New Book</h1>
      <input
        type="text"
        placeholder="title"
        onChange={handleChange}
        name="BookTitle"
      />
      <input
        type="text"
        placeholder="description"
        onChange={handleChange}
        name="BookDesc"
      />
      <input
        type="text"
        placeholder="cover"
        onChange={handleChange}
        name="BookCover"
      />
      <button className="form-btn" onClick={handleClick}>Add Book</button>
    </div>
  );
};

export default Add;
