const express = require('express');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const { predictDisease } = require('../../utils/predict');
const { v4: uuidv4 } = require('uuid');
const auth = require('../../middleware/auth');

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// @route    POST api/predictions
// @desc     Make a prediction
// @access   Private
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    // Resize and save the image
    const imagePath = path.join(__dirname, '../../uploads', `${uuidv4()}.jpg`);
    await sharp(req.file.buffer)
      .resize(224, 224)
      .toFile(imagePath);

    // Predict the disease
    const prediction = await predictDisease(imagePath, req.user.id);

    res.json({ prediction, imagePath });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
