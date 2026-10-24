const cloudinary = require("../config/cloudinary");
const { Readable } = require("stream");
const PORTFOLIO_FOLDER = "Portfolio Peworld";

const getPortfolioPublicId = (productId) =>
  `${PORTFOLIO_FOLDER}/${productId}`;

/**
 * Uploads an image file to Cloudinary.
 * @param {string} filePath - Local path to the image file.
 * @returns {Promise<object>} Cloudinary upload result.
 */

async function uploadImage(filePath, productId) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      {
        folder: PORTFOLIO_FOLDER,
        public_id: productId,
        overwrite: true,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );
  });
}

async function uploadImageBuffer(buffer, productId) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: PORTFOLIO_FOLDER,
        public_id: productId,
        overwrite: true,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );

    Readable.from([buffer]).pipe(uploadStream);
  });
}

async function deletePortfolioImage(productId) {
  return cloudinary.uploader.destroy(getPortfolioPublicId(productId));
}

module.exports = {
  uploadImage,
  uploadImageBuffer,
  deletePortfolioImage,
  getPortfolioPublicId,
};
