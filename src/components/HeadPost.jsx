import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const HeadPost = ({ user, date }) => {
  return (
    <div className="flex gap-3 items-center mb-4">
      <NavLink to={`/user/profile/${user.username}`} className="w-12 h-12 border rounded-full overflow-hidden">
        <img src={user.image_url} alt="Foto-Profile-User" className="block w-full h-full" />
      </NavLink>
      <div className="flex flex-col">
        <Link to={`/user/profile/${user.username}`}>
          <h4 className="font-medium text-base">{user.username}</h4>
        </Link>
        <small className="text-slate-400 -mt-1">{new Date(date).toDateString()}</small>
      </div>
    </div>
  );
};

export default HeadPost;
