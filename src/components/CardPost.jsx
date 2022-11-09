import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeadThread from './HeadPost';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost } from '../redux/actions/post';
import { BiDotsVerticalRounded, BiCommentDetail } from 'react-icons/bi';
import { FaTrashAlt } from 'react-icons/fa';
import { TbEdit } from 'react-icons/tb';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import axios, { axiosJWT } from '../api/axios';
import swal from 'sweetalert';

const CardPost = ({ post }) => {
  const dispatch = useDispatch();

  const { userId, username, roles } = useSelector((state) => state.auth);
  const [openMenuPost, setOpenMenuPost] = useState(false);
  const [dataLikes, setDataLikes] = useState([]);
  const [amountComment, setAmountComment] = useState();

  useEffect(() => {
    getLikesByPostId();
    getAmountCommentsByPostId();
  }, []);

  const getLikesByPostId = async () => {
    const response = await axios.get(`/forum/likes?postId=${post.id}`);
    setDataLikes(response.data);
  };

  const getAmountCommentsByPostId = async () => {
    const response = await axios.get(`/forum/comment?post_id=${post.id}`);
    setAmountComment(response?.data?.totalRows);
  };

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

  const isLiked = () => {
    let result = false;
    dataLikes.map((like) => {
      result = like.user_id == userId ? true : false;
    });
    return result;
  };

  const handleLike = async () => {
    if (!username)
      return swal({
        icon: 'error',
        title: '😌 MAAF',
        text: 'Anda harus login dulu jika ingin memberikan like',
      });
    if (isLiked()) {
      await axiosJWT.delete(`/forum/likes/${post.id}`);
    } else {
      await axiosJWT.post('/forum/likes', { postId: post.id });
    }
    return getLikesByPostId();
  };

  return (
    <>
      {post ? (
        <div>
          <HeadThread user={post.user} date={post.createdAt} />
          <Link to={`/post/${post.id}`} className="flex mt-2 h-[117px] overflow-hidden dark:text-gray-200 gap-1">
            <h2 className="text-xl leading-7 font-semibold">{post.title}</h2>
            {post.image_url && (
              <div className="flex-none w-[30%] place-self-end">
                <img src={post.image_url} />
              </div>
            )}
          </Link>
          <div className="absolute w-full bottom-3 left-0 flex justify-between px-3">
            <div className="flex place-self-end gap-x-5 text-gray-800 dark:text-gray-200">
              <span className="flex items-center gap-1.5">
                {isLiked() ? <AiFillHeart size={20} className="text-red-500 cursor-pointer" onClick={handleLike} /> : <AiOutlineHeart size={20} className="cursor-pointer" onClick={handleLike} />}
                <span className="text-sm">{dataLikes.length} Likes</span>
              </span>
              <Link to={`/post/${post.id}`} className="flex items-center gap-1.5">
                <BiCommentDetail size={20} />
                <span className="text-sm">{amountComment} Comments</span>
              </Link>
            </div>
            <Link to={`/category/${post.category.id}`}>
              <p className="text-sm button-category px-3 rounded-xl dark:bg-slate-800 dark:text-gray-300">#{post.category.title}</p>
            </Link>
          </div>

          {post.user.username === username || roles === 'admin' || roles === 'moderator' ? (
            <div className="absolute top-3 right-2">
              <BiDotsVerticalRounded className="w-5 h-5 cursor-pointer dark:text-white" onClick={() => setOpenMenuPost(!openMenuPost)} />

              {openMenuPost && (
                <>
                  <div className="fixed z-40 top-0 right-0 bottom-0 left-0" onClick={(e) => closeModalMenuPost(e)}></div>
                  <div className="absolute z-40 top-5 right-2 rounded-sm bg-gray-100 shadow shadow-gray-400 border border-gray-400">
                    {username === post.user.username || roles !== 'user' ? (
                      <Link
                        to={`/post/edit/${post.id}`}
                        className="flex gap-1 items-center w-24 text-gray-600 hover:text-slate-900 hover:bg-gray-300 text-left py-2 px-3 text-xs cursor-pointer dark:bg-slate-800 dark:text-gray-200 dark:hover:text-gray-400 dark:hover:bg-gray-900"
                      >
                        <TbEdit size={14} />
                        Edit
                      </Link>
                    ) : (
                      ''
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
