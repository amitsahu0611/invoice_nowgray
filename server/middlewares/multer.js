/** @format */

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const currentModulePath = __dirname;
const projectRootPath = path.resolve(currentModulePath, "../");
const publicDocImagesPath = path.join(projectRootPath, "public", "uploads");

if (!fs.existsSync(publicDocImagesPath)) {
  fs.mkdirSync(publicDocImagesPath, {recursive: true});
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("req", req.files);
    cb(null, publicDocImagesPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({storage: storage});

module.exports = upload;
