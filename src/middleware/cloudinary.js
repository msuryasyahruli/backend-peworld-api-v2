const cloudinary = require("../config/cloudinary");

/**
 * Uploads an image file to Cloudinary.
 * @param {string} filePath - Local path to the image file.
 * @returns {Promise<object>} Cloudinary upload result.
 */

async function uploadImage(filePath) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      { folder: process.env.CLOUDINARY_FOLDER || "uploads" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );
  });
}

module.exports = { uploadImage };
