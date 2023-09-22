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
const authRouter = require("./auth.router");

const { isLogin } = require("../Middlewares/authorization");
const { singleUpload } = require("../Middlewares/diskUpload");

const { sendMail } = require("../Helpers/sendMail");

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

mainRouter.post("/upload", singleUpload("image"), (req, res) => {
  console.log(req.file);
  res.status(200).json({
    msg: "OK",
  });
});

mainRouter.get("/mail", async (req, res) => {
  try {
    const info = await sendMail({
      to: "maxobi5436@fandsend.com",
      subject: "Email Activation",
      data: {
        username: "fazztrack",
        activationLink: "https://www.fazztrack.com/",
      },
    });
    res.status(200).json({
      msg: "Success",
      response: info.response,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

mainRouter.use("/books", isLogin, bookRouter);
mainRouter.use("/author", authorRouter);
mainRouter.use("/promos", promoRouter);
mainRouter.use("/publisher", publisherRouter);
mainRouter.use("/auth", authRouter);

module.exports = mainRouter;
