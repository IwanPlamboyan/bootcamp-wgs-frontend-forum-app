import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import HeadThread from './HeadPost';
import parser from 'html-react-parser';

const CardPost = ({ post }) => {
  return (
    <>
      {post ? (
        <>
          <HeadThread user={post.user} date={post.createdAt} />
          <NavLink to={`/post/${post.id}`} className="inline-block mt-2 h-[120px] overflow-hidden">
            <h2 className="text-2xl leading-7 font-bold">{post.title}</h2>
            <div className="mt-3 mx-[2px] thread-body">{parser(post.body)}</div>
          </NavLink>
          <Link to={`/category/${post.category.id}`} className="absolute left-3 bottom-3">
            <p className="mt-4 text-sm button-category px-3 rounded-xl">#{post.category.title}</p>
          </Link>
        </>
      ) : (
        <>
          <div className="h-4 bg-slate-300 rounded col-span-2 my-2"></div>
          <div className="h-4 bg-slate-300 rounded col-span-2 my-2"></div>
          <div className="h-4 bg-slate-300 rounded col-span-2 my-2"></div>
          <div className="h-4 bg-slate-300 rounded col-span-2 my-2"></div>
          <div className="h-4 bg-slate-300 rounded col-span-2 my-2"></div>
        </>
      )}
    </>
  );
};

export default CardPost;
