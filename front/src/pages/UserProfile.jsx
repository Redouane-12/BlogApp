import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchUserPosts();
  }, []); // Fetch user posts when the component mounts

  const fetchUserPosts = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
      const response = await axios.get('http://localhost:3003/user/me/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(response.data.posts || []); // Initialize as empty array if posts are not available
      setUser(response.data.posts && response.data.posts.length > 0 ? response.data.posts[0].author : {});
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">{user.name}'s Profile</h1>
        <p className="text-lg font-semibold text-gray-700">Email: {user.email}</p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Posts by {user.name}</h2><br></br>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <Link key={post._id} to={`/posts/${post._id}`} className="block">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">
                <img className="w-full h-48 object-cover" src={post.imageUrl} alt={post.title} />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-700">{post.description}</p>
                </div>
                <div className="px-6 py-4 bg-gray-100">
                  <p className="text-sm text-gray-600">Author: {user.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
