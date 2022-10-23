import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import DetailPost from './pages/DetailPost';
import Categories from './pages/Categories';
import Category from './pages/Category';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import Users from './pages/Users';
import Log from './pages/Log';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/add" element={<CreatePost />} />
        <Route path="/post/:id" element={<DetailPost />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/user/profile/:username" element={<Profile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/log" element={<Log />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
