// main router => hub yang menghubungkan semua subrouter
// sub router => router yang dipisahkan berdasarkan kegunaan

// menggunakan router express
const express = require("express");
const mainRouter = express.Router();
// const mainRouter = require("express").Router();

const bookRouter = require("./books.router");
const authorRouter = require("./authors.router");
const promoRouter = require("./promos.router");
const publisherRouter = require("./publishers.router");

mainRouter.get(
  "/",
  (req, res, next) => {
    console.log("mid 1");
    next();
  },
  (req, res, next) => {
    console.log("mid 2");
    next();
  },
  (req, res) => {
    console.log("last mid");
    res.json({
      msg: "Hello",
    });
  }
);

mainRouter.use("/books", bookRouter);
mainRouter.use("/author", authorRouter);
mainRouter.use("/promos", promoRouter);
mainRouter.use("/publisher", publisherRouter);

module.exports = mainRouter;