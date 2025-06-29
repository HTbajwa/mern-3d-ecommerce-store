const multer = require("multer");
const path = require("path");

const modelStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/images"); // new folder
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const modelFileFilter = (req, file, cb) => {
  const allowed = ['.glb'];
  const ext = path.extname(file.originalname).toLowerCase();
  cb(null, allowed.includes(ext));
};

const uploadModel = multer({
  storage: modelStorage,
  fileFilter: modelFileFilter,
});

module.exports = uploadModel;
