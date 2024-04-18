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
          <img src={logo} alt="Navbar logo" className="h-20" />
          <span className="font-bold text-3xl">Blog </span><span className="font-bold text-3xl"> App</span>
        </Link>
        <ul className="flex space-x-2">
        {isAuth?(<>
          <li><Link to="/me" className="inline-block underline underline-offset-8 bg-transparent px-4 py-3 text-center font-bold text-black">Profile</Link></li>
          <li><Link to="/create" className="inline-block underline underline-offset-8 bg-transparent px-4 py-3 text-center font-bold text-black">Create Post</Link></li>
          <li><Link to="/allPosts" className="inline-block underline underline-offset-8 bg-transparent px-4 py-3 text-center font-bold text-black">Posts</Link></li>
          <li><Link onClick={logout} className="inline-block rounded-md border border-gray bg-red-800 px-8 py-3 text-center font-semibold text-white">LogOut</Link></li>
          </>):(<li><Link to="/loginSignup" className="inline-block rounded-md border border-gray bg-green-800 px-8 py-3 text-center font-semibold text-white">Login</Link></li>)}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
