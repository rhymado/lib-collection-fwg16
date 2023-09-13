const { del, insert, update } = require("../Models/authors.model");
const createNewAuthor = (req, res) => {
  const { body } = req;
  insert(body.author_name)
    .then((data) => {
      res.status(201).json({
        msg: "Penulis berhasil dimasukkan",
        result: data.rows,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        msg: "Internal Server Error",
      });
    });
};

const editAuthor = async (req, res) => {
  try {
    const { body, params } = req;
    await update(body.name, params.author_id);
    res.status(200).json({
      msg: `Nama penulis untuk id ${params.author_id} berubah menjadi ${body.name}`,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const { params } = req;
    const data = await del(params.author_id);
    res.status(200).json({
      msg: `Penulis dengan id ${params.author_id} bernama ${data.rows[0].author_name} berhasil dihapus`,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  createNewAuthor,
  editAuthor,
  deleteAuthor,
};
