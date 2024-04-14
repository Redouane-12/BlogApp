const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');


const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blog-posts', // Folder name in Cloudinary where the images will be stored
    public_id: (req, file) => `${Date.now()}-${file.originalname}` // Public ID of the image
  }
});

const upload = multer({ storage: storage });


// Route to get all posts
router.get('/', PostController.getAllPosts);

router.get('/:id', PostController.getPostById);


router.post('/', authMiddleware,upload.single("imageUrl"), PostController.createPost);


router.put('/:id', authMiddleware,upload.single("imageUrl"), PostController.updatePost);


router.delete('/:id', authMiddleware, PostController.deletePost);

module.exports = router;
