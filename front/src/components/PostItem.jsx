import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';


const PostItem = ({ id, title, description, author, imageUrl }) => {
  return (
    <>
      <Link to={`/post/${id}`} className="max-w-sm rounded overflow-hidden shadow-lg block hover:shadow-xl transition duration-300">
        <img className="w-full" src={imageUrl} alt="" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">By {author}</span>
          {/* <PostAuthor /> Add your PostAuthor component here */}
        </div>
      </Link>
    </>
  );
};

export default PostItem;
