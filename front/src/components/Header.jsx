import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logoBlog.png';


const Header = () => {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    setIsAuth(localStorage.getItem('isAuth') == 'true');
    return () => {
    };
  }, [isAuth]);

  const logout = () => {
    localStorage.removeItem('isAuth');
    localStorage.removeItem('token');
    setIsAuth(false);
  };


  return (
    <nav className="bg-yellow-200"> {/* Changed background color to bg-blue-500 */}
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link to="/" className="flex items-center space-x-2 text-black">
          <img src={logo} alt="Navbar logo" className="h-10" />
          <span className="font-bold text-2xl">Blog </span><span className="font-bold text-2xl"> App</span>
        </Link>
        <ul className="flex space-x-4">
        {isAuth?(<>
          <li><Link to="/profile" className="text-xl text-black hover:text-red-700">Profile</Link></li>
          <li><Link to="/create" className="text-xl text-black hover:text-red-700">Create Post</Link></li>
          <li><Link to="/users" className="text-xl text-black hover:text-red-700">Users</Link></li>
          <li><Link onClick={logout} className="text-xl text-black hover:text-red-700">LogOut</Link></li>
          </>):(<li><Link to="/loginSignup" className="text-xl text-black hover:text-red-700">Login</Link></li>)}
        </ul>
        <button className="lg:hidden text-Black">Menu</button>
      </div>
    </nav>
  );
};

export default Header;
