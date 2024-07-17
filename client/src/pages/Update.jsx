import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    BookTitle: "",
    BookDesc: "",
    BookCover: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const BookID = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/books/${BookID}`, book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form">
      <h1>Update Book</h1>
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
      <button className="form-btn" onClick={handleClick}>
        Update Book
      </button>
    </div>
  );
};

export default Update;
