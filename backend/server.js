import e from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();
const app = e();
app.use(e.json());
app.use(cors());
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER
})
app.get('/', (req, res) => {
    res.json("Hello this is the backend")
})

// get all books from database
app.get('/books', (req, res) => {
    const query = "SELECT * FROM books;";
    db.query(query, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    })
})


// create a book
app.post('/books', (req, res) => {
    const query = "INSERT INTO books(`title`, `content`, `coverImg`, `price`, `MRP`) VALUES(?)";
    const values = [
        req.body.title,
        req.body.content,
        req.body.coverImg,
        req.body.price,
        req.body.mrp
    ];
    db.query(query, [values], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json("Book is added successfully");
    })
})


// delete book 
app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const query = "DELETE FROM books WHERE id = ?";
    db.query(query, [bookId], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json("Book is deleted successfully");
    })
})

// get book by id
app.get('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const query = "SELECT * FROM books WHERE id = ?";
    db.query(query, [bookId], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    })
})

app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const query = "UPDATE books SET `title` = ?, `content` = ?, `price` = ?, `coverImg` = ? WHERE id = ?"
    const values = [
        req.body.title,
        req.body.content,
        req.body.price,
        req.body.coverImg
    ];
    db.query(query, [...values, bookId], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json("Book is updated successfully");
    })
})
app.listen(process.env.PORT, () => {
    console.log('Connected to backend!')
})