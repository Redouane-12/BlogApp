const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route to register a new user
router.post('/register', UserController.register);

// Route to login a user
router.post('/login', UserController.login);

router.put('/update', authMiddleware, UserController.updateUserAccount);

router.get('/me', authMiddleware, UserController.getProfile);

// Route to upload user avatar (requires authentication)
router.post('/avatar', authMiddleware, UserController.uploadAvatar);

router.get('/me/posts', authMiddleware, UserController.getUserPosts);

module.exports = router;
