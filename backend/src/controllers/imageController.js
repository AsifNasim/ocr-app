import multer from 'multer';

const multer = require('multer');
import { createWorker } from 'tesseract.js';
import path from 'path';


// Multer configuration for handling file uploads
const upload = multer({ 
  dest: path.join(__dirname, '../uploads/') 
}).single('image');

// Tesseract worker for OCR
const worker = createWorker();

// Handle image upload and text extraction
const uploadImage = async (req, res) => {
  try {
    // Upload the image using Multer
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        // Multer error
        return res.status(400).json({ error: 'Multer error' });
      } else if (err) {
        // Other errors
        return res.status(500).json({ error: 'Server error' });
      }

      // Check if file is provided
      if (!req.file) {
        return res.status(400).json({ error: 'No image uploaded' });
      }

      // Perform OCR on the uploaded image
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(req.file.path);
      await worker.terminate();

      // Send the extracted text in the response
      res.json({ text });
    });
  } catch (error) {
    console.error('Error during image upload and OCR:', error);
    res.status(500).json({ error: 'Error during image upload and OCR' });
  }
};

module.exports = {
  uploadImage
};
