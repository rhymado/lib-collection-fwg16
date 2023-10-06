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
const { singleUpload: singleDiskUpload } = require("../Middlewares/diskUpload");
const { singleUpload: singleMemoryUpload } = require("../Middlewares/memoryUpload");
const { environment } = require("../Configs/environments");
const { uploader } = require("../Helpers/cloudinary");

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

const singleUpload = (fieldname) => {
  if (environment === "VERCEL") return singleMemoryUpload(fieldname);
  return singleDiskUpload(fieldname);
};

mainRouter.post("/upload", singleUpload("image"), async (req, res) => {
  // console.log(req.file);
  try {
    const { data, err } = await uploader(req, "user-profile", 1);
    if (err) throw err;
    res.status(200).json({
      msg: "OK",
      data: {
        url: data.secure_url,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
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
