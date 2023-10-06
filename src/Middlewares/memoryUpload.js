const multer = require("multer");

const storage = multer.memoryStorage();

const memoryUpload = multer({
  storage,
  limits: {
    fileSize: 2e6, // max 2 mb
  },
  fileFilter: (req, file, cb) => {
    // const fileExt = path.extname(file.originalname);
    // pengondisian berdasarkan extension
    // jika bukan gambar, akan di tolak
    // cb(null, false)
    cb(null, true);
  },
});

const errFunc = (res, next) =>
  function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.status(500).json({
        msg: err.message,
      });
    } else if (err) {
      // An unknown error occurred when uploading.
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
    next();
    // Everything went fine.
  };

module.exports = {
  singleUpload: (fieldname) => (req, res, next) =>
    memoryUpload.single(fieldname)(req, res, errFunc(res, next)),
  multiUpload:
    (fieldname, maxCount = 1) =>
    (req, res, next) =>
      memoryUpload.array(fieldname, maxCount)(req, res, errFunc(res, next)),
  //   multiFieldUpload: (fieldList) => diskUpload.fields(fieldList),
};
