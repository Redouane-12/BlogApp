import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams(); // Get postId from the URL
  const [post, setPost] = useState(null); // State to store the post details

  useEffect(() => {
    fetchPostDetails();
  }, []);

  const fetchPostDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3003/post/${id}`);
      setPost(response.data); // Set the fetched post details to the state
    } catch (error) {
      console.error('Error fetching post details:', error);
    }
  };

  if (!post) {
    return <div>Loading...</div>; // Render a loading indicator while fetching data
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        <img className='w-full h-64 object-cover rounded-t-lg' src={post.imageUrl} alt={post.title} />
        <div className='p-6'>
          <h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
          <p className='text-gray-800 leading-relaxed mb-4'>{post.description}</p>
          <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-600'>Author: {post.author.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
