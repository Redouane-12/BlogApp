const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, default: "" },
    author:{type: mongoose.Schema.Types.ObjectId,ref:"users" },
    imageUrl: { type: String,default: "" },
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;