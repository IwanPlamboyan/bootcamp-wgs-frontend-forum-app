import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
// import Discussion from './pages/Discussion';
import Home from './pages/Home';
import DetailThread from './pages/DetailThread';
import Tag from './pages/Tag';
import Profile from './pages/Profile';
import AddThread from './pages/AddThread';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sub/add" element={<AddThread />} />
        <Route path="/sub/:id" element={<DetailThread />} />
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
