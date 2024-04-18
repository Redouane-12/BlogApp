import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";


const EditPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const {id} = useParams();
  useEffect(() => {
    fetchPostDetails();
  }, []);

  const fetchPostDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3003/post/${id}`);
      setTitle(response.data.title);
      setText(response.data.content);
    } catch (error) {
      console.error("Error fetching post details:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      title: title,
      content: text,
    };
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3003/post/${id}`, {
        method: 'Put',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        console.log('Post edited successfully');
        setTitle('');
        setText('');
        alert('Post Edited successfully');
        navigate('/me');
      } else {
        console.error('Error editing post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <section className="bg-transparent ">
        <div className=" lg:py-4 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-orange-500">Create New Blog</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title" className="text-black font-bold text-lg mt-8">
                Title:
              </label>
              <input
                className="block p-3 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-white dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light mb-3"
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="text" className="text-black font-bold text-lg mt-8">
                Content:
              </label>
              <textarea
                className="block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-white dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500 mb-3 pb-20"
                id="text"
                name="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-green-600 text-white font-bold inline-flex items-center justify-center p-2 rounded-md focus:outline-none ml-2 w-[150px] h-[50px] mt-11"
            >
              Edit Post
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default EditPost;
