import express from "express"
import mysql from "mysql2"
import cors from "cors"

const app = express()
app.use(cors());
app.use (express.json())

const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password: "admin",
    database: "test"
})

app.get("/", (req, res)=>{
    res.json("hello this is backend")
})

app.get("/books", (req, res)=>{
    const q = "SELECT * FROM books"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req, res)=>{
    const q = "INSERT INTO books (`BookTitle`, `BookDesc`, `BookCover`) VALUES (?)";
    const values = [
        req.body.BookTitle,
        req.body.BookDesc,
        req.body.BookCover,
    ];

    db.query(q,[values], (err,data)=>{
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.delete("/books/:BookID", (req, res)=>{
    const bookId = req.params.BookID;
    const q = "DELETE FROM books WHERE BookID = ?"

    db.query(q, [bookId], (err, data)=>{
        if (err) return res.json(err);
        return res.json("Book has been deleted successfully");
    });
});

app.put("/books/:BookID", (req, res)=>{
    const bookId = req.params.BookID;
    const q = "UPDATE books SET `BookTitle` = ?, `BookDesc` = ?, `BookCover` = ? WHERE BookID = ?"; 

    const values =[
        req.body.BookTitle,
        req.body.BookDesc,
        req.body.BookCover,
    ]

    db.query(q, [...values, bookId], (err, data)=>{
        if (err) res.send(err);
        return res.json("Book has been updated");
    });
});

app.listen(8800, () => {
    console.log("Connected to backend!");
});