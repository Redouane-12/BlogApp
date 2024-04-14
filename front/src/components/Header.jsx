import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logoBlog.png';

const Header = () => {
  return (
    <nav className="bg-gradient-to-r from-orange-400 to-yellow-500">
    <div className="container mx-auto flex justify-between items-center py-4">
      <Link to="/" className="flex items-center space-x-2 text-white">
        <img src={logo} alt="Navbar logo" className="h-10" /> {/* Increase logo size to h-10 */}
        <span className="font-bold text-xl">Blog App</span>
      </Link>
      <ul className="flex space-x-4">
        <li><Link to="/profile" className="text-white hover:text-gray-200">Achiever</Link></li>
        <li><Link to="/create" className="text-white hover:text-gray-200">Create Post</Link></li>
        <li><Link to="/users" className="text-white hover:text-gray-200">Users</Link></li>
        <li><Link to="/logout" className="text-white hover:text-gray-200">Logout</Link></li>
      </ul>
      <button className="lg:hidden text-white">
      </button>
    </div>
  </nav>
  );
};

export default Header;
