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
    const sql = `select b.id as "No.", b.book_name as "Judul Buku", 
      a.author_name as "Penulis", pb.publisher_name as "Penerbit", b.price as "Harga", pr.promo_name as "Promosi"
      from books b
      join authors a on b.authors_id = a.id
      join publishers pb on b.publishers_id = pb.id
      left join promos pr on b.promo_id = pr.id`;
    const result = await db.query(sql);
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
    const sql =
      'select b.id as "No.", b.book_name as "Judul Buku", a.author_name as "Penulis", pb.publisher_name as "Penerbit", b.price as "Harga", pr.promo_name as "Promosi" from books b join authors a on b.authors_id = a.id join publishers pb on b.publishers_id = pb.id left join promos pr on b.promo_id = pr.id where b.book_name ilike $1';
    const values = [`%${query.title}%`];
    const result = await db.query(sql, values);
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
    const sql =
      "insert into books (book_name, authors_id, publishers_id, price) values ($1, $2, $3, $4)";
    const values = [body.name, body.author, body.publisher, body.price];
    await db.query(sql, values);
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
