import React, { useState } from 'react';
import HeadPost from './HeadPost';
import parser from 'html-react-parser';
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../redux/actions/comment';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { FaTrashAlt } from 'react-icons/fa';

const Comment = ({ comment }) => {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.auth);

  const [openDeleteComment, setOpenDeleteComment] = useState(false);

  const closeModalDeleteComment = (e) => {
    let element = e.target;
    if (!element.length) {
      setOpenDeleteComment(false);
    }
  };

  const handleDeleteComment = (id) => {
    swal({
      title: 'HAPUS',
      text: 'Apakah anda yakin ingin menghapusnya?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteComment(id));
      }
    });
  };

  return (
    <div className="w-full bg-white border pt-7 px-7 mb-2 relative">
      {username === comment.user.username && (
        <div className="absolute top-3 right-2">
          <BiDotsVerticalRounded className="w-5 h-5 cursor-pointer" onClick={() => setOpenDeleteComment(!openDeleteComment)} />

          {openDeleteComment && (
            <>
              <div className="fixed z-40 top-0 right-0 bottom-0 left-0" onClick={(e) => closeModalDeleteComment(e)}></div>
              <div className="absolute z-40 top-5 right-2 rounded-sm bg-gray-100 shadow shadow-gray-400 border border-gray-400">
                <div className="flex gap-1 items-center w-24 text-gray-600 hover:text-slate-900 hover:bg-gray-300 text-left py-2 px-3 text-xs cursor-pointer" onClick={() => handleDeleteComment(comment.id)}>
                  <FaTrashAlt />
                  Hapus
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <HeadPost user={comment.user} date={comment.createdAt} />

      <hr className="mt-2 mb-5" />
      <div>
        <div className="mb-7">{parser(comment.name)}</div>
      </div>
    </div>
  );
};

export default Comment;
