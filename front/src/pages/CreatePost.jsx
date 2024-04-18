import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'gz4wseiw');
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dfkbvterw/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setImage(data.secure_url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleFileSelect = (e) => {
    handleImageUpload(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      title: title,
      text: text,
      image: image,
    };
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3003/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        console.log('Post created successfully');
        setImage('');
        setTitle('');
        setText('');
        alert('Post created successfully');
        navigate('/allPosts');
      } else {
        console.error('Error creating post');
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
              <label htmlFor="image" className="text-black font-bold text-lg mt-8">
                Image:
              </label>
              <input
                className="block w-full text-sm text-black border border-bg-white rounded-lg cursor-pointer bg-gray-50 dark:text-bg-white focus:outline-none dark:bg-bg-white dark:border-bg-white dark:placeholder-bg-white pt-3 pb-3 pl-3 mb-3"
                type="file"
                id="image"
                accept="image/*"
                onChange={handleFileSelect}
                required
              />
            </div>
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
                Description:
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
              Create Post
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CreatePost;
