import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';


import './index.css';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import Authors from './pages/Authors';
import CreatePost from './pages/CreatePost';
import AuthorPosts from './pages/AuthorPosts';
import EditPost from './pages/EditPost';
import Register from './pages/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
      {index:true, element: <Home />},
      {path: 'posts/:id', element: <PostDetail />},
      {path: 'register', element: <Register />},
      {path: 'login', element: <Login />},
      {path: 'profile/:id', element: <UserProfile />},
      {path: 'authors', element: <Authors />},
      {path: 'create', element: <CreatePost />},
      {path: 'posts/users/:id', element: <AuthorPosts />},
      {path: 'posts/:id/edit', element: <EditPost />},
    ],
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

