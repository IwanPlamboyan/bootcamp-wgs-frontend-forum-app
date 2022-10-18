import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import TipTap from '../components/TipTap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMainForum } from '../redux/actions/mainForum';
import { refreshToken } from '../redux/actions/auth';
import { useNavigate } from 'react-router-dom';
import { addSubForum, resetAddSubForum } from '../redux/actions/subForum';

const AddThread = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getTokenError, userId } = useSelector((state) => state.auth);
  const { getAllMainForumResult, getAllMainForumLoading, getAllMainForumError } = useSelector((state) => state.mainForum);
  const { addSubForumResult } = useSelector((state) => state.subForum);

  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const [image, setImage] = useState('');
  const [preview, setPreview] = useState('');
  const [body, setBody] = useState('');

  const loadImage = (e) => {
    const image = e.target.files[0];
    setImage(image);
    setPreview(URL.createObjectURL(image));
  };

  useEffect(() => {
    dispatch(refreshToken());
    dispatch(getAllMainForum());
  }, []);

  useEffect(() => {
    if (getTokenError) {
      navigate('/');
    }
  }, [getTokenError]);

  const onSubmitAddSubForum = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('user_id', userId);
    formData.append('main_id', categoryId);
    formData.append('body', body);
    dispatch(addSubForum(formData));
  };

  useEffect(() => {
    if (addSubForumResult) {
      setTitle('');
      setCategoryId(0);
      setImage('');
      setPreview('');
      setBody('');
      navigate('/');
      dispatch(resetAddSubForum());
    }
  }, [addSubForumResult]);

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <div className="w-full bg-white border p-4">
          <h1 className="text-2xl font-bold text-center">Buat Thread</h1>
        </div>
        <div className="w-full bg-white border py-7 px-3 pb-20 sm:px-10 md:px-20 mt-1 relative">
          <div>
            <form onSubmit={onSubmitAddSubForum}>
              <label className="block sm:flex sm:gap-[100px] sm:items-center mb-3">
                <span className="block text-base font-medium text-slate-700 mb-1 cursor-pointer">Judul</span>
                <input
                  type="text"
                  className="bg-white w-full border border-gray-400 rounded-sm px-3 shadow-sm focus:outline-none sm:text-sm py-2 focus:border-slate-900"
                  placeholder="Isi judul Thread"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>
              <label className="block sm:flex sm:gap-[72px] sm:items-center mb-3">
                <span className="block text-base font-medium text-slate-700 mb-1 cursor-pointer">Category</span>
                <div className="flex justify-center w-full">
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="block w-full px-3 py-1.5 text-sm font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-400 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-slate-900 focus:outline-none cursor-pointer"
                    required
                  >
                    <option value="">-- Pilih Category --</option>
                    {getAllMainForumResult ? (
                      getAllMainForumResult.map((mainForum) => (
                        <option key={mainForum.id} value={mainForum.id}>
                          {mainForum.title}
                        </option>
                      ))
                    ) : getAllMainForumLoading ? (
                      <option>Loading...</option>
                    ) : (
                      <option>{getAllMainForumError ? getAllMainForumError : 'Category Masih Kosong'}</option>
                    )}
                  </select>
                </div>
              </label>
              <div className="block my-3 w-full">
                {preview ? (
                  <div className="mb-2">
                    <img className="w-auto sm:h-64 rounded-md border image-preview" src={preview} alt="Upload_Foto" />
                  </div>
                ) : (
                  ''
                )}
                <label className="block sm:flex sm:gap-4 xl:gap-0 sm:items-center mb-3">
                  <span className="block sm:w-44 md:w-40 text-base font-medium text-slate-700 mb-1 cursor-pointer">Upload Gambar</span>
                  <input id="image" className="block w-full text-base text-gray-900 bg-gray-50 rounded-sm border border-gray-400 cursor-pointer dark:text-gray-400 focus:outline-none" type="file" onChange={loadImage}></input>
                </label>
              </div>
              <button type="submit" className="button left-3 right-3 sm:left-10 sm:right-10 md:left-20 md:right-20 bottom-5 flex absolute">
                Submit
              </button>
            </form>
            <label>
              <span className="block text-base font-medium text-slate-700 mb-1 mt-2 cursor-pointer">Deskripsi</span>
              <div className="border rounded-sm">
                <TipTap setValue={setBody} />
              </div>
            </label>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddThread;
