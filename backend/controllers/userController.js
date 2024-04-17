const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
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





//------



// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// const bcrypt = require('bcrypt');
// const secret_key = "2g0j0w091u9w37";

// function signupPage(req, res) {
//     res.render("signup");
// }

// async function signup(req, res) {
//     const existUser = await User.findOne({name: req.body.name});
//     if(existUser){
//         res.send("User already exist.");
//     }else {
//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

//         req.body.password = hashedPassword;

//         const userData = await User.insertMany(req.body);
//         console.log(userData);
//         res.redirect("/login")
//     }
// }

// function loginPage(req, res) {
//     res.render("login");
// }

// async function login(req, res) {
//     try{
//         const check = await User.findOne({name: req.body.name});
//         if(!check){
//             return res.send("User cannot found");
//         }

//         const passwordMatch = await bcrypt.compare(req.body.password, check.password)
//         if(!passwordMatch){
//             return res.send("Wrong password")
//         }
//         const btkn = jwt.sign({ userId: check._id }, secret_key, {expiresIn: "20000s"});
//         let token = "Bearer " + btkn;
//         res.send(token);

//     }catch{
//         res.send("wrong Details!!!")    
//     }
// };



// module.exports = {signupPage, signup, loginPage, login}


