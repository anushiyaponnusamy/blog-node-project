
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const path = require('path');
require('dotenv').config();

cloudinary.config({
  cloud_name: 'ddaf8ftoj',
  api_key: '576789522748994',
  api_secret: '9G4HAkps8MsWp9FYa57nUo-aPJw'
});
// Multer configuration for file upload
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

const uploadMiddleware = async (req, res, next) => {
  try {
    await new Promise((resolve, reject) => {
      upload.single('image')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: 'Error uploading image' });
        } else if (err) {
          return res.status(500).json({ error: 'Server error' });
        }

        resolve();
      });
    });
    if (!req.file) {
      return res.status(400).json({ error: 'Missing file in the request' });
    }
    const base64 = req.file.buffer.toString('base64');
    const result = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${base64}`, {
      resource_type: 'auto', // 'auto' detects the file type
      public_id: path.parse(req.file.originalname).name // Set your desired filename here
    });
    req.imageUrl = result.secure_url;
    next();
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};



module.exports = uploadMiddleware;


