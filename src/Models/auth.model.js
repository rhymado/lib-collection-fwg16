const db = require("../Configs/postgre");

const createUser = (username, email, userpass) => {
  const sql = "INSERT INTO users (username, email, userpass) VALUES ($1, $2, $3)";
  const values = [username, email, userpass];
  return db.query(sql, values);
};

const getPwd = (email) => {
  const sql = "SELECT userpass, username FROM users WHERE email = $1";
  const values = [email];
  return db.query(sql, values);
};

module.exports = {
  createUser,
  getPwd,
};
