const express = require("express");

const { getAllBooks, addNewBook, searchBooks } = require("../Handlers/books.handler");

const bookRouter = express.Router();

bookRouter.get("/", getAllBooks);

bookRouter.get("/search", searchBooks);

bookRouter.post("/", addNewBook);

module.exports = bookRouter;
