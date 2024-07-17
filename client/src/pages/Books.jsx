import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (BookID)=>{
    try{
      await axios.delete(`http://localhost:8800/books/${BookID}`);
      window.location.reload();
    } catch (err){
      console.log(err);
    }
  }

  return (
    <>
      <div>
        <h1 className="shop-name">Rented Book Shop</h1>

        <div className="bookContainer">
          <div className="card">
            {books.map((book) => (
              <div className="book" key={book.BookID}>
                {book.BookCover && (
                  <img src={book.BookCover} alt="Book Cover Image" />
                )}
                <hr />
                <h2>{book.BookTitle}</h2>
                <p>{book.BookDesc}</p>
                <button className="delete" onClick={()=>handleDelete(book.BookID)}>Delete</button>
                <button className="update"><Link className="btn-update" to ={`/update/${book.BookID}`}>Update</Link></button>
              </div>
            ))}
          </div>
        </div>

        <button className="book-add">
          <Link to="/add" className="book-add-link">
            Add New Book
          </Link>
        </button>
      </div>
    </>
  );
};

export default Books;