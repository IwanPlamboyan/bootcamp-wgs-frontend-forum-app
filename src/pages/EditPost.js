import React, { useEffect, useState, useRef } from 'react';
import Layout from './Layout';
import TipTap from '../components/TipTap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../redux/actions/category';
import { refreshToken } from '../redux/actions/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById, editPost, resetEditPost, editPostCategory, resetEditPostCategory } from '../redux/actions/post';
import { BiSad } from 'react-icons/bi';

const EditPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { getTokenError, userId, username, roles } = useSelector((state) => state.auth);
  const { getAllCategoryResult, getAllCategoryLoading, getAllCategoryError } = useSelector((state) => state.category);
  const { getPostByIdResult, getPostByIdLoading, getPostByIdError, editPostResult, editPostCategoryResult } = useSelector((state) => state.post);

  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const [image, setImage] = useState('');
  const [preview, setPreview] = useState('');
  const [body, setBody] = useState('');
  const inputTitleRef = useRef(null);

  const loadImage = (e) => {
    try {
      const image = e.target.files[0];
      setImage(image);
      setPreview(URL.createObjectURL(image));
    } catch (error) {
      setPreview('');
    }
  };

  useEffect(() => {
    dispatch(refreshToken());
    dispatch(getAllCategory());
    dispatch(getPostById(id));
  }, []);

  useEffect(() => {
    if (getPostByIdResult) {
      if (getPostByIdResult.user.username !== username && roles === 'user') {
        navigate('/');
      } else {
        setTitle(getPostByIdResult?.title);
        setCategoryId(getPostByIdResult?.category_id);
        setImage(getPostByIdResult?.image_name);
        setPreview(getPostByIdResult?.image_url);
        setBody(getPostByIdResult?.body);
        if (getPostByIdResult.user.username !== username) {
          inputTitleRef.current.setAttribute('readonly', '');
        }
      }
    }
    if (getTokenError) {
      navigate('/');
    }
    if (editPostResult) {
      dispatch(resetEditPost());
      navigate('/');
    }
    if (editPostCategoryResult) {
      dispatch(resetEditPostCategory());
      navigate('/');
    }
  }, [getPostByIdResult, getTokenError, editPostResult, editPostCategoryResult]);

  const onSubmitEditPost = (e) => {
    e.preventDefault();
    if (getPostByIdResult.user.username === username) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('image', image);
      formData.append('user_id', userId);
      formData.append('category_id', categoryId);
      formData.append('body', body);
      dispatch(editPost(id, formData));
    } else {
      dispatch(editPostCategory(id, { category_id: categoryId }));
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <div className="w-full bg-white border p-4 dark:bg-[#070D17] dark:border-borderDark dark:text-white">
          <h1 className="text-2xl font-bold text-center">Edit Thread</h1>
        </div>
        <div className="w-full bg-white border py-7 px-3 pb-20 sm:px-10 md:px-20 mt-1 relative dark:bg-[#070D17] dark:border-borderDark dark:text-white">
          {getAllCategoryResult && getPostByIdResult ? (
            <div>
              <form onSubmit={onSubmitEditPost}>
                <label className="block sm:flex sm:gap-[100px] sm:items-center mb-3">
                  <span className="block text-base font-medium text-slate-700 mb-1 cursor-pointer dark:text-white">Judul</span>
                  <input
                    type="text"
                    className="bg-white w-full border border-gray-400 rounded-sm px-3 shadow-sm focus:outline-none sm:text-sm py-2 focus:border-slate-900 dark:bg-[#070D17] dark:border-borderDark dark:text-white read-only:bg-gray-200 read-only:focus:border-gray-400"
                    placeholder="Isi judul Thread"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    ref={inputTitleRef}
                    required
                  />
                </label>
                <label className="block sm:flex sm:gap-[72px] sm:items-center mb-3">
                  <span className="block text-base font-medium text-slate-700 mb-1 cursor-pointer dark:text-white">Category</span>
                  <div className="flex justify-center w-full">
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="block w-full px-3 py-1.5 text-sm font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-400 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-slate-900 focus:outline-none cursor-pointer dark:bg-[#070D17] dark:border-borderDark dark:text-gray-200"
                      required
                    >
                      <option value="" className="dark:text-gray-400">
                        -- Pilih Category --
                      </option>
                      {getAllCategoryResult ? (
                        getAllCategoryResult.map((category) => (
                          <option key={category.id} value={category.id} className="dark:text-white">
                            {category.title}
                          </option>
                        ))
                      ) : getAllCategoryLoading ? (
                        <option>Loading...</option>
                      ) : (
                        <option>{getAllCategoryError ? getAllCategoryError : 'Category Masih Kosong'}</option>
                      )}
                    </select>
                  </div>
                </label>
                <div className="block my-3 w-full">
                  {preview ? (
                    <div className="mb-2">
                      <img className="w-auto sm:h-64 rounded-md border image-preview dark:bg-[#070D17] dark:border-borderDark dark:text-white" src={preview} alt="Upload_Foto" />
                    </div>
                  ) : (
                    ''
                  )}
                  <label className="block sm:flex sm:gap-4 xl:gap-0 sm:items-center mb-3">
                    <span className={`block sm:w-44 md:w-40 text-base font-medium text-slate-700 mb-1 cursor-pointer dark:text-white ${getPostByIdResult.user.username !== username && roles !== 'user' ? 'hidden' : 'block'}`}>
                      Upload Gambar
                    </span>
                    <input
                      id="image"
                      className={`w-full text-base text-gray-900 bg-gray-50 rounded-sm border border-gray-400 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-[#070D17] dark:border-borderDark ${
                        getPostByIdResult.user.username !== username && roles !== 'user' ? 'hidden' : 'block'
                      }`}
                      type="file"
                      onChange={loadImage}
                    ></input>
                  </label>
                </div>
                <button type="submit" className="button left-3 right-3 sm:left-10 sm:right-10 md:left-20 md:right-20 bottom-5 flex absolute">
                  Submit
                </button>
              </form>
              <label>
                <span className="block text-base font-medium text-slate-700 mb-1 mt-2 cursor-pointer dark:text-white">Deskripsi</span>
                <div className="border rounded-sm dark:border-borderDark">
                  {getPostByIdResult ? (
                    <TipTap setValue={setBody} autofocus={false} content={getPostByIdResult?.body} isEditable={getPostByIdResult.user.username === username ? true : false} />
                  ) : getPostByIdLoading ? (
                    'Loading'
                  ) : (
                    <div>{getPostByIdError}</div>
                  )}
                </div>
              </label>
            </div>
          ) : getAllCategoryLoading && getPostByIdLoading ? (
            <div>
              <p>Loading...</p>
            </div>
          ) : (
            <div>
              {getAllCategoryError ? (
                getAllCategoryError
              ) : (
                <div className="flex items-center gap-2">
                  <BiSad className="w-8 h-8" />
                  <p>Maaf Category masih kosong, Minta Admin atau Moderator untuk menambahkan category.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EditPost;
