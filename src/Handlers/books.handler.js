const { get, search, insert, count } = require("../Models/books.model");
const getAllBooks = async (req, res) => {
  /**
   * req => Request Object
   * berisikan informasi dari suatu request (method, body, dll)
   * res => Response Object
   * object response yang digunakan untuk mengontrol response
   * next => Next Function
   * fungsi yang digunakan untuk melanjutkan request ke handler/cb berikutnya
   *  return res.send("Selamat Datang Kembali");
   * async await try catch
   */
  try {
    const { query } = req;
    const result = await get(query.page, query.limit);
    if (!result.rows.length)
      return res.status(404).json({
        msg: "Halaman tidak ditemukan",
        result: [],
      });
    const metaResult = await count({
      page: query.page,
      limit: query.limit,
    });
    const totalData = parseInt(metaResult.rows[0].total_books);
    const totalPage = Math.ceil(totalData / parseInt(query.limit));
    const isLastPage = parseInt(query.page) > totalPage;
    // console.log(metaResult.rows);
    const meta = {
      page: parseInt(query.page),
      totalPage,
      totalData,
      next: isLastPage ? null : "next page link",
      prev: parseInt(query.page) === 1 ? null : "prev page link",
    };
    res.status(200).json({
      msg: "Success",
      result: result.rows,
      meta,
    });
  } catch (error) {
    console.log(error);
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
    const metaResult = await count({
      title: query.title,
    });
    // console.log(metaResult.rows);
    const meta = {
      page: 1,
      totalData: parseInt(metaResult.rows[0].total_books),
      next: "",
      prev: "",
    };
    res.status(200).json({
      msg: "Success",
      result: result.rows,
      meta,
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
