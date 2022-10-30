import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import HeadThread from './HeadPost';
import parser from 'html-react-parser';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost } from '../redux/actions/post';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { FaTrashAlt } from 'react-icons/fa';
import { TbEdit } from 'react-icons/tb';
import swal from 'sweetalert';

const CardPost = ({ post }) => {
  const dispatch = useDispatch();

  const { username, roles } = useSelector((state) => state.auth);
  const [openMenuPost, setOpenMenuPost] = useState(false);

  const closeModalMenuPost = (e) => {
    let element = e.target;
    if (!element.length) {
      setOpenMenuPost(false);
    }
  };

  const handleDeletePost = (postId) => {
    swal({
      title: 'HAPUS',
      text: 'Apakah anda yakin ingin menghapusnya?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePost(postId));
      }
    });
  };

  return (
    <>
      {post ? (
        <div>
          <HeadThread user={post.user} date={post.createdAt} />
          <NavLink to={`/post/${post.id}`} className="inline-block mt-2 h-[117px] overflow-hidden dark:text-gray-200">
            <h2 className="text-[22px] leading-7 font-bold">{post.title}</h2>
            <div className="mt-3 mx-[2px] thread-body">{parser(post.body)}</div>
          </NavLink>
          <Link to={`/category/${post.category.id}`} className="absolute left-3 bottom-3">
            <p className="mt-4 text-sm button-category px-3 rounded-xl dark:bg-slate-800 dark:text-gray-300">#{post.category.title}</p>
          </Link>

          {post.user.username === username || roles === 'admin' || roles === 'moderator' ? (
            <div className="absolute top-3 right-2">
              <BiDotsVerticalRounded className="w-5 h-5 cursor-pointer dark:text-white" onClick={() => setOpenMenuPost(!openMenuPost)} />

              {openMenuPost && (
                <>
                  <div className="fixed z-40 top-0 right-0 bottom-0 left-0" onClick={(e) => closeModalMenuPost(e)}></div>
                  <div className="absolute z-40 top-5 right-2 rounded-sm bg-gray-100 shadow shadow-gray-400 border border-gray-400">
                    {username === post.user.username && (
                      <Link
                        to={`/post/edit/${post.id}`}
                        className="flex gap-1 items-center w-24 text-gray-600 hover:text-slate-900 hover:bg-gray-300 text-left py-2 px-3 text-xs cursor-pointer dark:bg-slate-800 dark:text-gray-200 dark:hover:text-gray-400 dark:hover:bg-gray-900"
                      >
                        <TbEdit size={14} />
                        Edit
                      </Link>
                    )}
                    <div
                      className="flex gap-1 items-center w-24 text-gray-600 hover:text-slate-900 hover:bg-gray-300 text-left py-2 px-3 text-xs cursor-pointer dark:bg-slate-800 dark:text-gray-200 dark:hover:text-gray-400 dark:hover:bg-gray-900"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <FaTrashAlt />
                      Hapus
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default CardPost;
