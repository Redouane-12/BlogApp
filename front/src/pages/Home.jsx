import React from 'react';
import Posts from '../components/Posts';
import homePic from '../images/blogHome.png';

const Home = () => {
  return (
    <>
<section className="bg-yellow-200 rounded-[80px]	 mx-16 py-10 px-4 lg:px-0" style={{ marginTop: '3rem' }}>
  <div className="container ml-5 flex flex-col lg:flex-row items-center justify-between">
    <div className="text-white max-w-lg lg:mr-12"> 
      <h2 className="text-4xl lg:text-5xl pl-8 font-bold mb-6">Welcome to my Blog App!</h2>
      <p className="mb-8 pl-8 lg:mb-6">Discover a world of captivating stories and insightful articles.</p>
      <button className="bg-white text-yellow-500 hover:bg-yellow-600 hover:text-white ml-5 pl-8 px-8 py-4 rounded-full font-medium transition duration-300 ease-in-out">Latest Posts</button>
    </div>
    <img className="hidden lg:block mr-10 size-96	 rounded-full object-cover border-4 border-white" src={homePic} alt="Profile Image" />
  </div>
</section>


    <section className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold text-center mb-8">Latest Blogs</h1>
      <Posts />
    </section>
    </>
  );
};

export default Home;
