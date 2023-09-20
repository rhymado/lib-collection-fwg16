require("dotenv").config();
// require (es5, commonJS)
// import (es6, module)
const express = require("express");
// const cors = require("cors");
const morgan = require("morgan");

// generate express application
const server = express();
// const app = require("express")();

// Pasang parser untuk json dan form url encoded
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// berikan port untuk aplikasi express
server.listen(8000, () => {
  console.log("Server is Running at Port 8000");
});

server.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
// server.use(
//   cors({
//     origin: "http://127.0.0.1:5500",
//     methods: ["POST", "PATCH"],
//   })
// );

const mainRouter = require("./src/Routers/main.router");
server.use(mainRouter);

// buat handler untuk request
// server.METHOD
// server.use(handler)
// const onGetRequest = () => {};
// server.get("/books", async (req, res, next) => {
//   // req => Request Object
//   // berisikan informasi dari suatu request (method, body, dll)
//   // res => Response Object
//   // object response yang digunakan untuk mengontrol response
//   // next => Next Function
//   // fungsi yang digunakan untuk melanjutkan request ke handler/cb berikutnya
//   //   return res.send("Selamat Datang Kembali");
//   // async await try catch
//   try {
//     const sql = `select b.id as "No.", b.book_name as "Judul Buku",
//     a.author_name as "Penulis", pb.publisher_name as "Penerbit", b.price as "Harga", pr.promo_name as "Promosi"
//     from books b
//     join authors a on b.authors_id = a.id
//     join publishers pb on b.publishers_id = pb.id
//     left join promos pr on b.promo_id = pr.id`;
//     const result = await db.query(sql);
//     res.status(200).json({
//       msg: "Success",
//       result: result.rows,
//     });
//   } catch (error) {
//     res.status(500).json({
//       msg: "Internal Server Error",
//     });
//   }
// });

// server.get(
//   "/",
//   (req, res, next) => {
//     console.log("mid 1");
//     next();
//   },
//   (req, res, next) => {
//     console.log("mid 2");
//     next();
//   },
//   (req, res) => {
//     console.log("last mid");
//     res.json({
//       msg: "Hello",
//     });
//   }
// );

// metode input request
// 1. body, diantaranya berbentuk raw json dan url encoded form
// server.post("/author", (req, res) => {
//   const { body } = req;
//   const sql = "insert into authors (author_name) values ($1) returning id, author_name";
//   const values = [body.author_name];
//   db.query(sql, values)
//     .then((data) => {
//       res.status(201).json({
//         msg: "Penulis berhasil dimasukkan",
//         result: data.rows,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         msg: "Internal Server Error",
//       });
//     });
// });

// server.post("/books", async (req, res) => {
//   const { body } = req;
//   try {
//     const sql =
//       "insert into books (book_name, authors_id, publishers_id, price) values ($1, $2, $3, $4)";
//     const values = [body.name, body.author, body.publisher, body.price];
//     await db.query(sql, values);
//     res.status(201).json({
//       msg: "Buku Berhasil Dimasukkan",
//     });
//   } catch (err) {
//     res.status(500).json({
//       msg: "Internal Server Error",
//     });
//   }
// });

// metode input request
// 2. route params
// /author/1, author_id = 1
// /author/5, author_id = 5
// server.patch("/author/:author_id", async (req, res) => {
//   try {
//     const { body, params } = req;
//     const sql = "update authors set author_name = $1, updated_at = now() where id = $2";
//     const values = [body.name, params.author_id];
//     await db.query(sql, values);
//     res.status(200).json({
//       msg: `Nama penulis untuk id ${params.author_id} berubah menjadi ${body.name}`,
//     });
//   } catch (err) {
//     res.status(500).json({
//       msg: "Internal Server Error",
//     });
//   }
// });

// server.delete("/author/:author_id", async (req, res) => {
//   try {
//     const { params } = req;
//     const sql = "delete from authors where id = $1 returning author_name";
//     const values = [params.author_id];
//     const data = await db.query(sql, values);
//     res.status(200).json({
//       msg: `Penulis dengan id ${params.author_id} bernama ${data.rows[0].author_name} berhasil dihapus`,
//     });
//   } catch (err) {
//     res.status(500).json({
//       msg: "Internal Server Error",
//     });
//   }
// });

// metode input request
// 3. route query
// endpoint?key=value&key=value
// server.get("/books/search", async (req, res) => {
//   try {
//     const { query } = req;
//     const sql =
//       'select b.id as "No.", b.book_name as "Judul Buku", a.author_name as "Penulis", pb.publisher_name as "Penerbit", b.price as "Harga", pr.promo_name as "Promosi" from books b join authors a on b.authors_id = a.id join publishers pb on b.publishers_id = pb.id left join promos pr on b.promo_id = pr.id where b.book_name ilike $1';
//     const values = [`%${query.title}%`];
//     const result = await db.query(sql, values);
//     if (result.rows.length === 0)
//       return res.status(404).json({
//         msg: "Buku Tidak Ditemukan",
//         result: [],
//       });
//     res.status(200).json({
//       msg: "Success",
//       result: result.rows,
//     });
//   } catch (error) {
//     res.status(500).json({
//       msg: "Internal Server Error",
//     });
//   }
// });
