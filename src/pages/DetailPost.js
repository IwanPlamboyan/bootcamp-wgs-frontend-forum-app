import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import TagSidebar from '../components/TagSidebar';
import HeadPost from '../components/HeadPost';
import Comment from '../components/Comment';
import TipTap from '../components/TipTap';
import parser from 'html-react-parser';
import ReactPaginate from 'react-paginate';
import axios from '../api/axios';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { VscChromeClose } from 'react-icons/vsc';
import { BsFillReplyFill } from 'react-icons/bs';
import { getPostById } from '../redux/actions/post';
import { addComment, resetAddComment, resetDeleteComment } from '../redux/actions/comment';
import swal from 'sweetalert';

const DetailThread = () => {
  const dispatch = useDispatch();
  const { userId, username } = useSelector((state) => state.auth);
  const { getPostByIdResult, getPostByIdLoading, getPostByIdError } = useSelector((state) => state.post);
  const { addCommentResult, deleteCommentResult } = useSelector((state) => state.comment);

  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [rows, setRows] = useState(0);
  const [modalPicture, setModalPicture] = useState(false);
  const [tempImgSrc, setTempImgSrc] = useState('');
  const { id } = useParams();

  const [showReply, setShowReply] = useState(false);
  const [reply, setReply] = useState('');

  const getCommentsByPostId = async () => {
    const response = await axios.get(`/forum/comment?post_id=${id}&page=${page}&limit=${limit}`);
    setComments(response.data.result);
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
  };

  useEffect(() => {
    dispatch(getPostById(id));
    getCommentsByPostId();
  }, [dispatch, page]);

  useEffect(() => {
    if (addCommentResult) {
      getCommentsByPostId();
      setShowReply(false);
      setReply('');
      dispatch(resetAddComment());
    }
    if (deleteCommentResult) {
      getCommentsByPostId();
      dispatch(resetDeleteComment());
    }
  }, [dispatch, addCommentResult, deleteCommentResult]);

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

  const changePage = ({ selected }) => {
    setPage(selected);
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
          <div className="w-full bg-white border pt-7 px-7 mb-10 dark:bg-[#070D17] dark:border-borderDark dark:text-white">
            <div className="flex justify-between">
              {getPostByIdResult && <HeadPost user={getPostByIdResult.user} date={getPostByIdResult.createdAt} />}

              <Link to={`/category/`} className="text-base text-gray-500">
                #{getPostByIdResult.category.title}
              </Link>
            </div>

            <hr className="my-6 dark:border-borderDark" />

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

            <hr className="mt-6 dark:border-borderDark" />

            {/* button reply */}
            <div>
              <div className="my-3 flex justify-end items-center gap-[2px] cursor-pointer hover:text-slate-500 transition-colors" onClick={() => tonggleReply()}>
                <BsFillReplyFill className="w-6 h-6" />
                <span>Balas</span>
              </div>
            </div>

            {/* modal comment/discussion */}
            {showReply && (
              <div className="mb-6 p-4 border border-slate-300 bg-gray-200 rounded-sm transition duration-1000 dark:bg-[#070D17] dark:border-borderDark">
                <strong className="text-lg block mb-2">Reply</strong>
                <div className="w-full bg-slate-50 border border-borderDark dark:bg-[#070D17]">
                  <TipTap setValue={setReply} autofocus={true} clear={false} />
                </div>
                <form className="flex justify-end" onSubmit={tambahCommentSubmit}>
                  <button type="submit" className="mt-2 px-10 button">
                    Comment
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
        {comments.length > 0 ? (
          <>
            <div className="flex items-center justify-between py-2 px-5 bg-white border dark:bg-[#070D17] dark:border-borderDark dark:text-white">
              <p className="text-sm text-gray-500">
                Halaman : {rows ? page + 1 : 0} dari {pages}
              </p>
              <nav key={rows}>
                <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  pageCount={Math.min(10, pages)}
                  onPageChange={changePage}
                  containerClassName="list-none flex items-center text-sm gap-1"
                  pageLinkClassName="flex justify-center items-center w-7 h-7 py-1 px-1 text-sm rounded-full font-normal hover:bg-blue-500 hover:text-white border-2 transition-colors"
                  previousClassName="flex justify-center items-center w-7 h-7 py-1 px-1 text-sm rounded-full font-bold hover:bg-gray-200 border-2"
                  nextLinkClassName="flex justify-center items-center w-7 h-7 py-1 px-1 text-sm rounded-full font-bold hover:bg-gray-200 border-2"
                  activeLinkClassName="bg-blue-500 text-white"
                />
              </nav>
            </div>

            <div className="my-5">
              {comments.map((comment) => (
                <Comment comment={comment} key={comment.id} />
              ))}
            </div>

            <div className="flex items-center justify-between py-2 px-5 bg-white border dark:bg-[#070D17] dark:border-borderDark dark:text-white">
              <p className="text-sm text-gray-500">
                Halaman : {rows ? page + 1 : 0} dari {pages}
              </p>
              <nav key={rows}>
                <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  pageCount={Math.min(10, pages)}
                  onPageChange={changePage}
                  containerClassName="list-none flex items-center text-sm gap-1"
                  pageLinkClassName="flex justify-center items-center w-7 h-7 py-1 px-1 text-sm rounded-full font-normal hover:bg-blue-500 hover:text-white border-2 transition-colors"
                  previousClassName="flex justify-center items-center w-7 h-7 py-1 px-1 text-sm rounded-full font-bold hover:bg-gray-200 border-2"
                  nextLinkClassName="flex justify-center items-center w-7 h-7 py-1 px-1 text-sm rounded-full font-bold hover:bg-gray-200 border-2"
                  activeLinkClassName="bg-blue-500 text-white"
                />
              </nav>
            </div>
          </>
        ) : (
          <div className="w-full bg-white border p-3 mb-2 relative dark:bg-[#070D17] dark:border-borderDark dark:text-white">
            <p className="text-sm text-center">Masih belum ada komentar</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DetailThread;
