const db = require("../Configs/postgre");

const get = () => {
  const sql = `select b.id as "No.", b.book_name as "Judul Buku", 
      a.author_name as "Penulis", pb.publisher_name as "Penerbit", b.price as "Harga", pr.promo_name as "Promosi"
      from books b
      join authors a on b.authors_id = a.id
      join publishers pb on b.publishers_id = pb.id
      left join promos pr on b.promo_id = pr.id`;
  return db.query(sql);
};

const search = (title) => {
  const sql =
    'select b.id as "No.", b.book_name as "Judul Buku", a.author_name as "Penulis", pb.publisher_name as "Penerbit", b.price as "Harga", pr.promo_name as "Promosi" from books b join authors a on b.authors_id = a.id join publishers pb on b.publishers_id = pb.id left join promos pr on b.promo_id = pr.id where b.book_name ilike $1';
  const values = [`%${title}%`];
  return db.query(sql, values);
};

const insert = (title, author, publisher, price) => {
  const sql =
    "insert into books (book_name, authors_id, publishers_id, price) values ($1, $2, $3, $4)";
  const values = [title, author, publisher, price];
  return db.query(sql, values);
};

module.exports = {
  get,
  search,
  insert,
};
