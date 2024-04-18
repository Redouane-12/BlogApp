import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

// eslint-disable-next-line react-hooks/rules-of-hooks
const id = "seParams()";

const handleDelete = async () => {
  try {
    if(window.confirm('Are you sure you want to delete ?')) {
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
      const response = await axios.delete(`http://localhost:3003/post/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },

      });
      if (response.status === 200) {
        // Handle successful deletion
        console.log('Post deleted successfully');
        // You can also update the UI by removing the deleted post from the state or refetching the posts
      } else {
        // Handle deletion error
        console.error('Error deleting post');
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
};
const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPostDetails();
  }, []);

  const fetchPostDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3003/post/${id}`);
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching post details:", error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }
  console.log(post);
  return (
    <div className="container  mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto">
        <div className="border bg-white border-gray-300 rounded-lg overflow-hidden shadow-lg">
          <img
            className="w-full h-64 object-cover rounded-t-lg"
            src={post.imageUrl}
            alt={post.title}
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-800 leading-relaxed mb-4">{post.content}</p>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Author: {post.author.name}
              </p>
            </div>
            <div className="mt-4 flex justify-center"> {/* Center the buttons */}
              <Link to={`/posts/${post._id}/edit`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center mr-2">
                <FaEdit className="mr-1" />
                Edit
              </button>
              </Link>
              <button onClick={()=> handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center">
                <MdDelete className="mr-1" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
