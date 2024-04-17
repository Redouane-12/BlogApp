const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-6 absolute bottom-0 w-full">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Blog App. All rights reserved.</p>
          <div className="mt-4">
            <a href="#" className="text-gray-400 hover:text-white mx-2">Terms of Service</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="text-gray-400 hover:text-white mx-2">Privacy Policy</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  