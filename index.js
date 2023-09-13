// require (es5, commonJS)
// import (es6, module)
const express = require("express");

// generate express application
const server = express();
// const app = require("express")();

// buat handler untuk request
// server.METHOD
// server.use(handler)
// const onGetRequest = () => {};
server.get("/", (req, res, next) => {
  // req => Request Object
  // berisikan informasi dari suatu request (method, body, dll)
  // res => Response Object
  // object response yang digunakan untuk mengontrol response
  // next => Next Function
  // fungsi yang digunakan untuk melanjutkan request ke handler/cb berikutnya
  return res.send("Selamat Datang Kembali");
});

server.get(
  "/new",
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

// berikan port untuk aplikasi express
server.listen(8000, () => {
  console.log("Server is Running at Port 8000");
});
