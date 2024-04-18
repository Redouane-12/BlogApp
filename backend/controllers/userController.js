const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const Post = require('../models/Post');
const cloudinary = require('cloudinary').v2;


// Multer configuration for avatar uploads
const storage = multer.diskStorage({});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit avatar size to 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  },
}).single('avatar');

// Cloudinary configuration for cloud storage
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UserController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error registering user' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(404).json({ error: 'Invalid password' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      res.status(200).json({ token, user });

    } catch (error) {
      res.status(500).json({ error: 'Error logging in' });
    }
  },

  getProfile: async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Verify and decode the token

      if (!decodedToken || !decodedToken.userId) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      const userId = decodedToken.userId;
      const user = await User.findById(userId).select('-password');

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ user });
    } catch (error) {
      console.error('Error getting user profile by token:', error);
      res.status(500).json({ error: 'Error getting user profile by token' });
    }
  },

  getUserPosts: async (req, res) => {
    try {
      const userId = req.userId; // Assuming userId is stored in JWT payload

      // Fetch user's posts from the Post model
      const userPosts = await Post.find({ author: userId }).populate("author");

      res.status(200).json({ posts: userPosts });
    } catch (error) {
      console.error('Error fetching user posts:', error);
      res.status(500).json({ error: 'Error fetching user posts' });
    }
  },
  
  updateUserAccount: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const userId = req.user._id; // User ID from authenticated request

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Update user's account information
      if (name) user.name = name;
      if (email) user.email = email;
      if (password) user.password = password; // Hash password if needed

      await user.save();

      res.json({ message: 'User account updated successfully', user: user });
    } catch (error) {
      console.error('Error updating user account:', error);
      res.status(500).json({ error: 'Error updating user account' });
    }
  },

  uploadAvatar: async (req, res) => {
    try {
      const { avatarUrl } = req.body;
      const userId = req.user._id; // User ID from authenticated request

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Update user's avatarUrl
      user.avatarUrl = avatarUrl;
      await user.save();

      res.json({ message: 'Avatar uploaded successfully', user: user });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      res.status(500).json({ error: 'Error uploading avatar' });
    }
  },
};

module.exports = UserController;



