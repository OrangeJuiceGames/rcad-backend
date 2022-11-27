const multer = require('multer')
const upload = multer()
const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.post('/user', upload.none(), userController.setHighScore);
router.get('/user', userController.getHighScores);

module.exports = router;


