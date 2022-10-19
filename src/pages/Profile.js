import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import CardPost from '../components/CardPost';
import Modal from '../components/Modal';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserByUsername } from '../redux/actions/user';
import { FaTrashAlt, FaUserEdit } from 'react-icons/fa';
import { getAllPostByUserId, deletePost } from '../redux/actions/post';
import swal from 'sweetalert';

const Profile = () => {
  const dispatch = useDispatch();
  const { getUserByUsernameResult, getUserByUsernameLoading, getUserByUsernameError } = useSelector((state) => state.user);
  const userLogin = useSelector((state) => state.auth);
  const { getAllPostByUserIdResult, getAllPostByUserIdLoading, getAllPostByUserIdError, deletePostResult } = useSelector((state) => state.post);

  const [showModal, setShowModal] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const { username } = useParams();

  const handleOnClose = () => setShowModal(false);
  const handleUpdated = () => setIsUpdated(!isUpdated);

  useEffect(() => {
    dispatch(getUserByUsername(username));
  }, [dispatch, isUpdated, username]);

  // get semua postingan berdasarkan id user ketika state getUserByUsernameResult dan deleteSubForumResult berubah
  useEffect(() => {
    if (getUserByUsernameResult) {
      dispatch(getAllPostByUserId(getUserByUsernameResult.id));
    }
  }, [getUserByUsernameResult, deletePostResult]);

  const handleDeletePost = (id) => {
    swal({
      title: 'HAPUS',
      text: 'Apakah anda yakin ingin menghapusnya?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePost(id));
      }
    });
  };

  return (
    <Layout>
      <div className="container py-3 mx-auto">
        <div className="sm:flex sm:gap-5">
          <div className="w-full sm:w-[800px] md:w-[620px] lg:w-[580px] xl:w-[500px] mb-14">
            {getUserByUsernameResult ? (
              <div className="sm:fixed bg-white border w-full sm:w-[345px] p-5 overflow-hidden">
                <div className="mx-auto w-64 h-64 border rounded-full overflow-hidden m-0">
                  <img src={getUserByUsernameResult.image_url} alt="Foto-profile" className="block w-full h-full" />
                </div>
                <div className="mt-3 text-center">
                  <h2 className="text-xl font-normal">{getUserByUsernameResult.username}</h2>
                  <h1 className="text-2xl font-semibold">{getUserByUsernameResult.fullname}</h1>
                  {getUserByUsernameResult.description && <p className="mt-2 text-left leading-5 text-sm">{getUserByUsernameResult.description}</p>}
                  <button className={`button w-full flex ${userLogin.username !== username ? 'hidden' : ''}`} onClick={() => setShowModal(true)}>
                    <FaUserEdit className="w-5 h-5" />
                    Edit Profile
                  </button>
                </div>
              </div>
            ) : getUserByUsernameLoading ? (
              <p>Loading...</p>
            ) : (
              <p>{getUserByUsernameError ? getUserByUsernameError : 'Data Kosong'}</p>
            )}
          </div>
          <div className="w-full overflow-hidden z-10">
            <div className="border bg-white text-center p-5 mb-2">
              <h3 className="text-xl font-medium">Thread</h3>
            </div>
            {getAllPostByUserIdResult ? (
              getAllPostByUserIdResult.result.map((post) => (
                <div key={post.id} className="group h-64 mb-1 border p-3 rounded-md overflow-hidden bg-white relative">
                  <CardPost post={post} />
                  {userLogin.username === username ? (
                    <div className="absolute right-5 opacity-80 transition-opacity group-hover:opacity-100 bottom-3">
                      <FaTrashAlt className="w-5 h-5 transition-colors text-gray-500 cursor-pointer hover:text-gray-900" onClick={() => handleDeletePost(post.id)} />
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              ))
            ) : getAllPostByUserIdLoading ? (
              <p>Loading...</p>
            ) : (
              <p>{getAllPostByUserIdError}</p>
            )}
          </div>
        </div>
      </div>
      {userLogin.username === username && <Modal onClose={handleOnClose} visible={showModal} isUpdated={handleUpdated} />}
    </Layout>
  );
};

export default Profile;
