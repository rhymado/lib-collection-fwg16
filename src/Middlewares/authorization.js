const jwt = require("jsonwebtoken");

const { jwtKey, issuer } = require("../Configs/environments");
/**
 * 1. mengecek header authorization
 * 2. ambil token
 * 3. jika tidak ditemukan, maka belum login, kirim response suruh login
 * 4. jika ditemukan, maka verifikasi token
 * 5. jika tidak valid, maka suruh login ulang
 * 6. jika valid, maka lanjut ke middleware berikutnya (akses diperbolehkan)
 */
const isLogin = (req, res, next) => {
  const bearerToken = req.header("Authorization");
  // bearer token
  if (!bearerToken)
    return res.status(401).json({
      msg: "Please login first",
    });
  const token = bearerToken.split(" ")[1];
  jwt.verify(token, jwtKey, { issuer }, (err, data) => {
    if (err) {
      switch (err.name) {
        case "TokenExpiredError":
          return res.status(401).json({
            msg: "Access ended, Please login again",
          });
        case "NotBeforeError":
          return res.status(401).json({
            msg: "Your access not started yet, Please access on time",
          });
      }
    }
    req.userInfo = data;
    next();
  });
};

const isRole = () => {};

module.exports = {
  isLogin,
  isRole,
};
