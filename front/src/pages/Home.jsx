import React from 'react';
import Posts from '../components/Posts';
import logo from '../images/logoBlog.png';

const Home = () => {
  return (
    <>
<section className="bg-yellow-200 py-16 px-4 lg:px-0" style={{ marginBottom: '2rem' }}>
  <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
    <div className="text-white max-w-lg lg:mr-12"> 
      <h2 className="text-4xl lg:text-5xl font-bold mb-6">Welcome to Our Blog App!</h2>
      <p className="mb-8 lg:mb-6">Discover a world of captivating stories and insightful articles.</p>
      <button className="bg-white text-yellow-500 hover:bg-yellow-600 hover:text-white px-8 py-4 rounded-full font-medium transition duration-300 ease-in-out">Explore Now</button>
    </div>
    <img className="hidden lg:block w-32 h-32 rounded-full object-cover border-4 border-white" src={logo} alt="Profile Image" />
  </div>
</section>


    <section className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold text-center mb-8">Blogs</h1>
      <Posts />
    </section>
    </>
  );
};

export default Home;
