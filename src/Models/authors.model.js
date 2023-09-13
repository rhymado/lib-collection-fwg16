const db = require("../Configs/postgre");
const insert = (authorName) => {
  //   return new Promise((resolve, reject) => {
  const sql = "insert into authors (author_name) values ($1) returning id, author_name";
  const values = [authorName];
  return db.query(sql, values);
  //   });
};

const update = (authorName, id) => {
  const sql = "update authors set author_name = $1, updated_at = now() where id = $2";
  const values = [authorName, id];
  return db.query(sql, values);
};

const del = (id) => {
  const sql = "delete from authors where id = $1 returning author_name";
  const values = [id];
  return db.query(sql, values);
};

module.exports = {
  insert,
  update,
  del,
};
