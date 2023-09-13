const express = require("express");

const { createNewAuthor, deleteAuthor, editAuthor } = require("../Handlers/authors.handler");

const authorRouter = express.Router();

authorRouter.post("/", createNewAuthor);

authorRouter.patch("/:author_id", editAuthor);

authorRouter.delete("/:author_id", deleteAuthor);

module.exports = authorRouter;
