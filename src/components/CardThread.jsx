import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import HeadThread from './HeadThread';

const CardThread = ({ subForum }) => {
  return (
    <>
      <HeadThread user={subForum.user} date={subForum.createdAt} />
      <NavLink to={`/sub/${subForum.id}`} className="inline-block mt-2 h-[110px] overflow-hidden">
        <h2 className="text-2xl leading-7 font-bold">{subForum.title}</h2>
        <p className="mt-3">{subForum.body} hahjhaj haghgahb ahhgha hahjhaj haghgahb ahhgha hahjhaj haghgahb ahhgha hahjhaj haghgahb ahhgha hahjhaj haghgahb ahhgha hahjhaj haghgahb ahhgha hahjhaj haghgahb ahhgha</p>
      </NavLink>
      <Link to={`/tag/${subForum.main_forum.id}`}>
        <p className="mt-4 button-category px-3 rounded-xl"># {subForum.main_forum.title}</p>
      </Link>
    </>
  );
};

export default CardThread;
