import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import TagSidebar from '../components/TagSidebar';
import parser from 'html-react-parser';
import HeadPost from '../components/HeadPost';
import TipTap from '../components/TipTap';
import Comment from '../components/Comment';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { VscChromeClose } from 'react-icons/vsc';
import { BsFillReplyFill } from 'react-icons/bs';
import { getPostById } from '../redux/actions/post';
import { getCommentsByPostId, addComment, resetAddComment, resetDeleteComment } from '../redux/actions/comment';
import swal from 'sweetalert';

const DetailThread = () => {
  const dispatch = useDispatch();
  const { userId, username } = useSelector((state) => state.auth);
  const { getPostByIdResult, getPostByIdLoading, getPostByIdError } = useSelector((state) => state.post);
  const { getCommentsByPostIdResult, getCommentsByPostIdLoading, getCommentsByPostIdError, addCommentResult, deleteCommentResult } = useSelector((state) => state.comment);

  const [modalPicture, setModalPicture] = useState(false);
  const [tempImgSrc, setTempImgSrc] = useState('');
  const { id } = useParams();

  const [showReply, setShowReply] = useState(false);
  const [reply, setReply] = useState('');

  useEffect(() => {
    dispatch(getPostById(id));
    dispatch(getCommentsByPostId(id));
  }, [dispatch]);

  useEffect(() => {
    if (addCommentResult) {
      dispatch(getCommentsByPostId(id));
      setShowReply(false);
      setReply('');
      dispatch(resetAddComment());
    }
  }, [dispatch, addCommentResult]);

  useEffect(() => {
    if (deleteCommentResult) {
      dispatch(getCommentsByPostId(id));
      dispatch(resetDeleteComment());
    }
  }, [dispatch, deleteCommentResult]);

  const getImg = (e) => {
    setTempImgSrc(e.target.src);
    setModalPicture(true);
  };

  const tonggleReply = () => {
    if (username) {
      setShowReply(!showReply);
    } else {
      swal({
        icon: 'error',
        title: '😌 MAAF',
        text: 'Anda harus login dulu jika ingin membalas komentar',
      });
    }
  };

  const tambahCommentSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment({ name: reply, post_id: getPostByIdResult.id, user_id: userId }));
  };

  return (
    <Layout>
      <div className={`w-full h-screen fixed top-0 left-0 flex justify-center items-center bg-black/95 transition-all overflow-hidden z-50 ${modalPicture ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-0'}`}>
        <img src={tempImgSrc} className="w-auto max-w-full max-h-full h-auto box-border py-6 mx-auto" alt="post_image" />
        <VscChromeClose className="w-9 h-9 fixed top-4 right-4 p-1 bg-black text-white cursor-pointer" onClick={() => setModalPicture(false)} />
      </div>

      <TagSidebar />
      <div className="container md:pr-[36%] lg:pr-[32%] xl:pr-[24%] pt-6 pb-14 px-2">
        {getPostByIdResult ? (
          <div className="w-full bg-white border pt-7 px-7 mb-10">
            {getPostByIdResult && <HeadPost user={getPostByIdResult.user} date={getPostByIdResult.createdAt} />}

            <hr className="my-6" />

            <div>
              <h2 className="text-3xl font-bold mb-10">{getPostByIdResult.title}</h2>
              {getPostByIdResult.image_url && (
                <div>
                  <img src={getPostByIdResult.image_url} alt="post_image" className="border rounded-sm mx-auto h-auto max-w-full align-bottom cursor-zoom-in" onClick={(e) => getImg(e)} />
                </div>
              )}
              <div className="my-5">
                <div className="thread-body">{parser(getPostByIdResult.body)}</div>
              </div>
            </div>

            <hr className="mt-6" />

            {/* button reply */}
            <div>
              <div className="my-3 flex justify-end items-center gap-[2px] cursor-pointer hover:text-slate-500 transition-colors" onClick={() => tonggleReply()}>
                <BsFillReplyFill className="w-6 h-6" />
                <span>Balas</span>
              </div>
            </div>

            {/* modal comment/discussion */}
            {showReply && (
              <div className="mb-6 p-4 border border-slate-300 bg-gray-200 rounded-sm transition duration-1000">
                <strong className="text-lg block mb-2">Reply</strong>
                <div className="w-full bg-slate-50 border">
                  <TipTap setValue={setReply} autofocus={true} clear={false} />
                </div>
                <form className="flex justify-end" onSubmit={tambahCommentSubmit}>
                  <button type="submit" className="mt-2 px-10 button">
                    Post
                  </button>
                </form>
              </div>
            )}
          </div>
        ) : getPostByIdLoading ? (
          <p>Loading...</p>
        ) : (
          <p>{getPostByIdError ? getPostByIdError : 'Data Tidak ditemukan'}</p>
        )}

        {/* comments */}
        {getCommentsByPostIdResult ? (
          <>
            {getCommentsByPostIdResult.result.length > 0 ? (
              getCommentsByPostIdResult.result.map((comment) => <Comment comment={comment} key={comment.id} />)
            ) : (
              <div className="w-full bg-white border p-3 mb-2 relative">
                <p className="text-sm text-center">Masih belum ada komentar</p>
              </div>
            )}
          </>
        ) : getCommentsByPostIdLoading ? (
          <p>Loading</p>
        ) : (
          <p>{getCommentsByPostIdError}</p>
        )}
      </div>
    </Layout>
  );
};

export default DetailThread;
