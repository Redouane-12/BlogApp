const Post = require('../models/Post');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



const PostController = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find().populate('author', 'name');
      res.json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Error fetching posts' });
    }
  },

  getPostById: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findById(id).populate('author', 'name');
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      res.status(500).json({ error: 'Error fetching post' });
    }
  },

  createPost: async (req, res) => {
    try {
      const { title, content,image } = req.body;
      const authorId = req.userId; // Assuming user ID is available in req.user after authentication

      if (!authorId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      // Create the new post with author ID
      const newPost = new Post({ title, content, imageUrl:image, author: authorId });
      await newPost.save();
      
      res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Error creating post' });
    }
  },

  updatePost: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const userId = req.userId;

      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      if (post.author.toString() !== userId.toString()) {
        return res.status(403).json({ error: 'Unauthorized to update this post' });
      }

      const updatedPost = await Post.findByIdAndUpdate(id, { title, content }, { new: true });
      res.json({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ error: 'Error updating post' });
    }
  },

  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user._id;

      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      if (post.author.toString() !== userId.toString()) {
        return res.status(403).json({ error: 'Unauthorized to delete this post' });
      }

      await Post.findByIdAndDelete(id);
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Error deleting post' });
    }
  },
};

module.exports = PostController;




//----------------------------------------------------------------

// const Post = require("../models/postModel");

// async function allPosts(req, res) {
//   const posts = await Post.find();

//   let output = "<h2>OUR POSTS</h2>\n";
//   posts.forEach((post) => {
//     output += ` <div style="background-color: #f0f0f0; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
//                   <h3 style="color: #333; font-size: 24px;">${post.title}</h3>
//                   <p style="color: #666; font-size: 16px;"><strong>Content of post:</strong> ${post.content}</p>
//                   <p style="color: #888; font-size: 14px;"><strong>PostId:</strong> ${post._id}</p>
//                   <hr style="border-color: #ccc;">
//                 </div>`;
//   });

//   return res.send(output);
// }

// async function profile(req, res) {
//   console.log("i am in profile");
//   const user = await getUser(req.userEmail);
//   res.send(user);
// }

// async function add(req, res) {
//   try {
//     const newPost = new Post({
//       title: req.body.title,
//       content: req.body.content,
//       author: req.userId,
//     });

//     newPost
//       .save()
//       .then(() => {
//         res.send("Post added succesfully");
//       })
//       .catch((err) => {
//         res.send(err.message);
//       });
//   } catch {
//     res.status(401).json({ msg: "You are not logged in" });
//   }
// }

// async function update(req, res) {
//   const { id } = req.params;
//   const { title, content } = req.body;
//   Post.findOneAndUpdate(
//     { _id: id },
//     {
//       $set: {
//         title: title,
//         content: content,
//       },
//     }
//   )
//     .then((post) => {
//       res.send("post Updated! " + post._id);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).send("Cannot Update this  post!");
//     });
// }

// async function remove(req, res) {
//   const { id } = req.params;

//   Post.findOneAndDelete({ _id: id })
//     .then((post) => {
//       if (post) {
//         return res.send("post deleted! id: " + post._id);
//       }

//       return res.status(400).send("Cannot delete this  post!");
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(400).send(err.message);
//     });
// }

// module.exports = { add, update, remove, profile, allPosts };
