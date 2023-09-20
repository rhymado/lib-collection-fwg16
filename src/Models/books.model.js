const db = require("../Configs/postgre");

const get = (page = 1, limit = 3) => {
  const sql = `select b.id as "No.", b.book_name as "Judul Buku", 
      a.author_name as "Penulis", pb.publisher_name as "Penerbit", b.price as "Harga", pr.promo_name as "Promosi"
      from books b
      join authors a on b.authors_id = a.id
      join publishers pb on b.publishers_id = pb.id
      left join promos pr on b.promo_id = pr.id
      limit $1 offset $2`;
  const offset = (parseInt(page) - 1) * parseInt(limit);
  const values = [limit, offset];
  return db.query(sql, values);
};

const count = (queries) => {
  let sql = `select count(*) as "total_books" from books b`;
  const values = [];
  if (queries.title || queries.genreId) sql += " where";
  if (queries.title) {
    sql += ` b.book_name ilike $${values.length + 1}`;
    values.push(`%${queries.title}%`);
  }
  console.log(sql, values);
  return db.query(sql, values);
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
  count,
};
  