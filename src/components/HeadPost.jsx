import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import moment from 'moment';
const HeadPost = ({ user, date }) => {
  return (
    <>
      <Link to={`/user/profile/${user.username}`} className="flex gap-3 items-center mb-4 w-fit">
        <Avatar imageUrl={user.image_url} />
        <div className="flex flex-col">
          <h4 className="font-medium text-base dark:text-white">{user.username}</h4>
          <small className="text-slate-400 -mt-1">{moment(date).format('LL')}</small>
        </div>
      </Link>
    </>
  );
};

export default HeadPost;
