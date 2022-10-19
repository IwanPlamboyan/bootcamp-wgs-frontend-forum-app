import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import TagSidebar from '../components/TagSidebar';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HeadPost from '../components/HeadPost';
import { getPostById } from '../redux/actions/post';
import parser from 'html-react-parser';
import { VscChromeClose } from 'react-icons/vsc';
import { BsFillReplyFill } from 'react-icons/bs';

const DetailThread = () => {
  const dispatch = useDispatch();
  const { getPostByIdResult, getPostByIdLoading, getPostByIdError } = useSelector((state) => state.post);

  const [model, setModel] = useState(false);
  const [tempImgSrc, setTempImgSrc] = useState('');
  const { id } = useParams();

  const getImg = (e) => {
    setTempImgSrc(e.target.src);
    setModel(true);
  };

  useEffect(() => {
    dispatch(getPostById(id));
  }, []);

  return (
    <Layout>
      <div className={`w-full h-screen fixed top-0 left-0 flex justify-center items-center bg-black/95 transition-all overflow-hidden z-50 ${model ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-0'}`}>
        <img src={tempImgSrc} className="w-auto max-w-full max-h-full h-auto box-border py-6 mx-auto" />
        <VscChromeClose className="w-9 h-9 fixed top-4 right-4 p-1 bg-black text-white cursor-pointer" onClick={() => setModel(false)} />
      </div>

      <TagSidebar />
      <div className="container md:pr-[36%] lg:pr-[32%] xl:pr-[24%] py-6 px-2">
        {getPostByIdResult ? (
          <div className="w-full bg-white border pt-7 px-7 mb-5">
            {getPostByIdResult && <HeadPost user={getPostByIdResult.user} date={getPostByIdResult.createdAt} />}
            <hr className="my-3" />
            <div>
              <h2 className="text-[26px] font-bold mb-3">{getPostByIdResult.title}</h2>
              {getPostByIdResult.image_url ? (
                <div className="sm:h-[380px] border rounded-sm overflow-hidden cursor-zoom-in" onClick={(e) => getImg(e)}>
                  <img src={getPostByIdResult.image_url} alt="forum-image" className="w-full h-auto" />
                </div>
              ) : (
                ''
              )}
              <div className="my-5">
                <div className="thread-body">{parser(getPostByIdResult.body)}</div>
              </div>
            </div>

            <hr className="mt-5" />

            {/* reply */}
            <div>
              <div className="my-3 flex justify-end items-center gap-[2px] cursor-pointer hover:text-slate-600 transition-colors">
                <BsFillReplyFill className="w-6 h-6" />
                <span>Balas</span>
              </div>
            </div>

            {/* modal comment/discussion */}
            <div className="mb-6 p-4 border border-slate-300 bg-gray-200 rounded-sm">
              <strong className="text-lg block mb-2">Reply</strong>
              <div className="w-full bg-slate-50 border p-3">{getPostByIdResult && <HeadPost user={getPostByIdResult.user} date={getPostByIdResult.createdAt} />}</div>
            </div>
          </div>
        ) : getPostByIdLoading ? (
          <p>Loading...</p>
        ) : (
          <p>{getPostByIdError ? getPostByIdError : 'Data Tidak ditemukan'}</p>
        )}
      </div>
    </Layout>
  );
};

export default DetailThread;
