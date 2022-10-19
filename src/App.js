import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
// import Discussion from './pages/Discussion';
import Home from './pages/Home';
import DetailPost from './pages/DetailPost';
import Tag from './pages/Tag';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/add" element={<CreatePost />} />
        <Route path="/post/:id" element={<DetailPost />} />
        <Route path="/tag/:id" element={<Tag />} />
        <Route path="/user/profile/:username" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/forum/discussion/:id" element={<Discussion />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
