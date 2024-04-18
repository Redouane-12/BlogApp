import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';


import './index.css';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import UserProfile from './pages/UserProfile';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import { LoginSignup } from './pages/LoginSignup';
import IsAuth from './components/IsAuth';
import AllPosts from './components/AllPosts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
      {index:true, element: <Home />},
      {path: 'posts/:id', element: <PostDetail />},
      {path: 'me', element: <IsAuth component={UserProfile} />},
      {path: 'create', element: <IsAuth component={CreatePost} />},
      {path: 'posts/:id/edit', element: <IsAuth component={EditPost} />},
      {path: 'loginSignup', element: <LoginSignup />},
      {path: 'allPosts', element: <AllPosts />}
    ],
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

