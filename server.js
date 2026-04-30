import express from "express"
import dotenv from "dotenv"

import createBook from "./src/books/createBook.js";
import filterBook from "./src/books/filterBook.js";
import getBookById from "./src/books/getBookById.js";
import updateBook from "./src/books/updateBook.js";
import deleteBook from "./src/books/deleteBook.js";

import createAuthor from "./src/authors/createAuthor.js";
import getAuthor from "./src/authors/getAuthor.js";
import getAuthorById from "./src/authors/getAuthorById.js";
import updateAuthor from "./src/authors/updateAuthor.js";
import deleteAuthor from "./src/authors/deleteAuthor.js";

import validateYear from "./src/middlewares/validateYear.js";

dotenv.config();

const app = express();
let port = process.env.PORT;

app.use(express.json());

app.post("/api/books", validateYear, createBook);
app.get("/api/books", filterBook);
app.get("/api/books/search", filterBook);
app.get("/api/books/:id", getBookById);
app.put("/api/books/:id", validateYear, updateBook);
app.delete("/api/books/:id", deleteBook);

app.post("/api/authors", createAuthor);
app.get("/api/authors", getAuthor);
app.get("/api/authors/:id", getAuthorById);
app.put("/api/authors/:id", updateAuthor);
app.delete("/api/authors/:id", deleteAuthor);

app.listen(port, () => {
    console.log("Server running on : ", port);
})