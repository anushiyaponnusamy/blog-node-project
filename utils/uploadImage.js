const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const path = require('path');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadMiddleware = async (req, res, next) => {
  try {
    // Handle multer file upload
    await new Promise((resolve, reject) => {
      upload.single('image')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          reject(new Error('Error uploading image'));
        } else if (err) {
          reject(new Error('Server error'));
        } else {
          resolve();
        }
      });
    });

    if (!req.file) {
      return res.status(400).json({ error: 'Missing file in the request' });
    }

    const base64 = req.file.buffer.toString('base64');
    const dataUri = `data:${req.file.mimetype};base64,${base64}`;


    const result = await cloudinary.uploader.upload(dataUri, {
      resource_type: 'auto',
      public_id: path.parse(req.file.originalname).name
    });

    req.imageUrl = result.secure_url;
    next();
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = uploadMiddleware;
