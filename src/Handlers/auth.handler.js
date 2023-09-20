const argon = require("argon2");
const jwt = require("jsonwebtoken");
const { createUser, getPwd } = require("../Models/auth.model");
const { jwtKey, issuer } = require("../Configs/environments");

/**
 * 1. menerima body (username, email, password) dari client
 * 2. hash password untuk dimasukkan ke db
 * 3. memasukkan data ke db
 * 4. jika error, error handling
 * 5. jika berhasil, kirim response berhasil
 */
const register = async (req, res) => {
  const {
    body: { email, username, password },
  } = req;
  // ambil pass dari body lalu di hash
  try {
    const hashedPassword = await argon.hash(password);
    await createUser(username, email, hashedPassword);
    res.status(201).json({
      msg: "User berhasil register",
      data: {
        username,
        email,
      },
    });
  } catch (err) {
    // console.log(err);
    if (err.code === "23505") {
      //   if (err.constraint.includes("username"))
      //     return res.status(400).json({
      //       msg: "Duplicate Username",
      //     });
      //   return res.status(400).json({
      //     msg: "Duplicate Email",
      //   });
      return res.status(400).json({
        msg: "Duplicate Email or Username",
      });
    }
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

/**
 * 1. menerima body (email, password) dari client
 * 2. verifikasi apakah password sama dengan yang ada di db
 * 3. jika tidak cocok, maka kirim response gagal
 * 4. jika cocok, buat identitas akses (jwt)
 * 5. kirim response berhasil bersamaan dengan identitas akses
 */
const login = async (req, res) => {
  const {
    body: { email, password },
  } = req;
  try {
    const result = await getPwd(email);
    if (!result.rows.length)
      return res.status(404).json({
        // msg: "Email not registered",
        msg: "Email or Password is wrong",
      });
    const { userpass, username, role } = result.rows[0];
    const isValid = await argon.verify(userpass, password);
    if (!isValid)
      return res.status(401).json({
        // msg: "Password does not match",
        msg: "Email or Password is wrong",
      });
    const payload = {
      username,
      email,
      role,
    };
    jwt.sign(
      payload,
      jwtKey,
      {
        expiresIn: "10m",
        issuer,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          msg: `Selamat Datang ${username}`,
          data: {
            token,
            userInfo: {
              email,
              username,
            },
          },
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = { register, login };
