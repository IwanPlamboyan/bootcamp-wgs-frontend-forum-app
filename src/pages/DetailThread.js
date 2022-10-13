import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import TagSidebar from '../components/TagSidebar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import HeadThread from '../components/HeadThread';

const DetailThread = () => {
  const [model, setModel] = useState(false);
  const [tempImgSrc, setTempImgSrc] = useState('');
  const [subForum, setSubForum] = useState('');
  const { id } = useParams();

  const getImg = (e) => {
    setTempImgSrc(e.target.src);
    setModel(true);
  };
  console.log(model);

  useEffect(() => {
    getSubForumById();
  }, []);

  const getSubForumById = async () => {
    const response = await axios.get(`http://localhost:5000/forum/sub/${id}`);
    setSubForum(response.data);
  };

  return (
    <Layout>
      <div className={`w-full h-screen fixed top-0 left-0 flex justify-center items-center bg-black/90 transition-all overflow-hidden z-50 ${model ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-0'}`}>
        <img src={tempImgSrc} className="w-auto max-w-full max-h-full h-auto box-border py-6 mx-auto" />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 fixed top-3 right-3 p-1 bg-black text-white cursor-pointer" onClick={() => setModel(false)}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <TagSidebar />
      <div className="container md:pr-[36%] lg:pr-[32%] xl:pr-[24%] py-6 px-2">
        <div className="w-full bg-white border p-5">
          {subForum && <HeadThread user={subForum.user} date={subForum.createdAt} />}
          <hr className="my-3" />
          <div>
            <h2 className="text-[26px] font-bold mb-3">{subForum.title}</h2>
            <div className="mx-5 sm:h-[450px] overflow-hidden bg-black cursor-zoom-in" onClick={(e) => getImg(e)}>
              <img src={subForum.image_url} alt="forum-image" className="w-full h-auto" />
            </div>
            <div className="my-5">
              <p className="text-lg">{subForum.body}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailThread;
