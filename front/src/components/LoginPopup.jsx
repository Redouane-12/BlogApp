import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom

const LoginPopup = ({ isOpen, onClose }) => {
  const [action, setAction] = useState('Login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const history = useHistory(); // Initialize useHistory

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://your-api-url/register', formData);
      console.log(response.data); // Handle success response
      history.push('/home'); // Redirect to the home page after successful signup
    } catch (error) {
      console.error(error.response.data); // Handle error response
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://your-api-url/login', formData);
      const { token } = response.data;
      localStorage.setItem('token', token); // Store token in localStorage
      console.log('Login successful');
      history.push('/home'); // Redirect to the home page after successful login
    } catch (error) {
      console.error(error.response.data); // Handle error response
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white w-96 p-8 rounded-lg shadow-lg">
        <div className="text-xl font-bold text-yellow-500 mb-4">{action}</div>
        <div className="w-full h-2 bg-yellow-500 rounded-full mb-8"></div>
        {action === 'Sign Up' && (
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full border-gray-300 border rounded px-3 py-2 focus:outline-none focus:border-yellow-400"
              onChange={handleInputChange}
            />
          </div>
        )}
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border-gray-300 border rounded px-3 py-2 focus:outline-none focus:border-yellow-400"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border-gray-300 border rounded px-3 py-2 focus:outline-none focus:border-yellow-400"
            onChange={handleInputChange}
          />
        </div>
        {action === 'Login' && (
          <div className="mb-4 text-sm text-gray-600">
            Lost Password?{' '}
            <span className="text-purple-900 cursor-pointer">Click Here!</span>
          </div>
        )}
        <div className="flex justify-center">
          <button
            className="w-32 h-12 bg-yellow-900 text-white rounded-full text-lg font-semibold mr-4"
            onClick={action === 'Login' ? handleLogin : handleRegister}
          >
            {action}
          </button>
          <button
            className="w-32 h-12 bg-yellow-900 text-white rounded-full text-lg font-semibold"
            onClick={() => setAction(action === 'Login' ? 'Sign Up' : 'Login')}
          >
            {action === 'Login' ? 'Sign Up' : 'Login'}
          </button>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            className="text-yellow-900 text-sm underline cursor-pointer"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
