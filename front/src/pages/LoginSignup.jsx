import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import name from '../images/person.png'
import email from '../images/email.png'
import password from '../images/password.png'

export const LoginSignup = () => {
  const [action, setAction] = useState('Login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (action === 'Login') {
        const response = await axios.post('http://localhost:3003/user/login', formData);
        if(response.status === 200) {
        console.log('Login response:', response.data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('isAuth',true);
        alert("Login Successfuly!");
        navigate('/');
        window.location.reload();
        }
        else if(response.status === 404) {
        alert("Email or Password Incorrect!");
        setFormData({
          password: '',
        })
        
        }
        console.log(response.status);
      } else {
        const response = await axios.post('http://localhost:3003/user/register', formData);
        if (response.status === 201) {
        console.log('Register response:', response.data);
        alert("Register Successfuly!");
        setFormData({
          name: '',
          email: '',
          password: '',
        })
        setAction("Login")
      }
      }

    } catch (error) {
      console.error('Error:', error.response);
    }

    setLoading(false);
  };

  return (
<div class="container flex flex-col h-100 w-3/5 my-auto mx-auto mt-24  bg-white rounded-lg shadow-md p-8">
  <div class="header flex flex-col items-center gap-2">
    <h1 class="text-4xl font-bold text-yellow-300">{action}</h1>
    <div class="underline h-2 bg-yellow-300 rounded-lg"></div>
  </div>
  <form class="inputs flex flex-col gap-6 mt-8" onSubmit={handleSubmit}>
    {action === 'Login' ? null : (
      <div class="input flex items-center mx-auto w-4/5 h-16 bg-gray-100 rounded-md">
        <img src={name} alt="" class="mr-4 ml-3 h-5 w-5" />
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          class="flex-grow bg-transparent outline-none focus:ring-yellow-300 focus:ring-opacity-50 rounded-md text-gray-700"
        />
      </div>
    )}
    <div class="input flex items-center mx-auto w-4/5 h-16 bg-gray-100 rounded-md">
      <img src={email} alt="" class="mr-4 ml-3 h-5 w-5" />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        class="flex-grow bg-transparent outline-none focus:ring-yellow-300 focus:ring-opacity-50 rounded-md text-gray-700"
      />
    </div>
    <div class="input flex items-center mx-auto w-4/5 h-16 bg-gray-100 rounded-md">
      <img src={password} alt="" class="mr-4 ml-3 h-5 w-5" />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        class="flex-grow bg-transparent outline-none focus:ring-yellow-300 focus:ring-opacity-50 rounded-md text-gray-700"
      />
    </div>
    {action === 'Sign Up' ? null : (
      <div class="forgot-password text-gray-500 text-sm pl-6 mt-4">
        Lost Password? <span class="text-yellow-600 cursor-pointer">Click Here!</span>
      </div>
    )}
    <div class="submit-container flex space-x-4 justify-center mt-8">
      <button
        type="submit"
        class={`submit flex justify-center items-center w-44 h-14 text-white rounded-full font-bold cursor-pointer ${
          action === 'Login' ? 'bg-gray-400 text-gray-500' : 'bg-yellow-200'
        }`}
        onClick={() => setAction('Sign Up')}
      >
        {loading && action === 'Sign Up' ? 'Signing Up...' : 'Sign Up'}
      </button>
      <button
        type="submit"
        class={`submit flex justify-center items-center w-44 h-14 text-white rounded-full font-bold cursor-pointer ${
          action === 'Sign Up' ? 'bg-gray-400 text-gray-500' : 'bg-yellow-200'
        }`}
        onClick={() => setAction('Login')}
      >
        {loading && action === 'Login' ? 'Logging In...' : 'Login'}
      </button>
    </div>
  </form>
</div>

  );
};
