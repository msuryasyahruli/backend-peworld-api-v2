const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { uploadImageBuffer } = require("./cloudinary");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.startsWith("image/")) {
      const error = new Error("Portfolio photo must be an image");
      error.status = 400;
      callback(error);
      return;
    }

    callback(null, true);
  },
});

const portfolioUpload = () => (req, res, next) => {
  upload.single("photo")(req, res, async (uploadError) => {
    if (uploadError) {
      if (uploadError instanceof multer.MulterError) {
        uploadError.status = 400;
      }
      next(uploadError);
      return;
    }

    const productId = req.params.id || uuidv4();
    req.body = req.body || {};
    req.portfolioProductId = productId;

    if (!req.file) {
      next();
      return;
    }

    try {
      const result = await uploadImageBuffer(req.file.buffer, productId);
      req.body.photo = result.secure_url;
      next();
    } catch (error) {
      next(error);
    }
  });
};

module.exports = portfolioUpload;
