const { get, search, insert } = require("../Models/books.model");
const getAllBooks = async (req, res, next) => {
  // req => Request Object
  // berisikan informasi dari suatu request (method, body, dll)
  // res => Response Object
  // object response yang digunakan untuk mengontrol response
  // next => Next Function
  // fungsi yang digunakan untuk melanjutkan request ke handler/cb berikutnya
  //   return res.send("Selamat Datang Kembali");
  // async await try catch
  try {
    const result = await get();
    res.status(200).json({
      msg: "Success",
      result: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const searchBooks = async (req, res) => {
  try {
    const { query } = req;
    const result = await search(query.title);
    if (result.rows.length === 0)
      return res.status(404).json({
        msg: "Buku Tidak Ditemukan",
        result: [],
      });
    res.status(200).json({
      msg: "Success",
      result: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const addNewBook = async (req, res) => {
  const { body } = req;
  try {
    await insert(body.name, body.author, body.publisher, body.price);
    res.status(201).json({
      msg: "Buku Berhasil Dimasukkan",
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllBooks,
  searchBooks,
  addNewBook,
};
