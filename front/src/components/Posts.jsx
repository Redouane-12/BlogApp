import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import PostItem from './PostItem'; // Assuming PostItem component is in a separate file
import logo from '../images/logoBlog.png';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3003/post'); // Updated URL
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <section className='container mx-auto'>
      <div className='flex justify-between items-center bg-gradient-to-r from-orange-400 to-yellow-500 p-8 rounded-lg mb-6'>
        <div className='text-white'>
          <h2 className='text-3xl font-bold mb-2'>Welcome to Our Blog App!</h2>
          <p className='mb-4'>Discover a world of captivating stories and insightful articles.</p>
          <button className='bg-white text-blue-500 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-full font-medium transition duration-300 ease-in-out'>Explore Now</button>
        </div>
        <img className='hidden lg:block w-24 h-24 rounded-full object-cover border-4 border-white' src={logo} alt='Profile Image' />
      </div>
      <h1 className='text-3xl text-center font-bold mb-6'>Blogs</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {posts.map(({ _id, title, description, author, imageUrl }) => (
          <Link key={_id} to={`/posts/${_id}`}>
            <article className='border rounded-lg overflow-hidden bg-white shadow-md cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out'>
              <img className='w-full h-48 object-cover' src={imageUrl} alt={title} />
              <div className='p-6'>
                <h2 className='text-xl font-bold mb-2'>{title}</h2>
                <p className='text-gray-700'>{description}</p>
              </div>
              <div className='px-6 py-4 bg-gray-100'>
                <p className='text-sm text-gray-600'>Author: {author.name}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Posts;
