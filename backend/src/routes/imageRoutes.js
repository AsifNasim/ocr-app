const express = require('express');
import imageController from '../controllers/imageController';

const router = express.Router();

// Route for image upload and text extraction
router.post('/upload', imageController.uploadImage);

export default router;

module.exports = router;
