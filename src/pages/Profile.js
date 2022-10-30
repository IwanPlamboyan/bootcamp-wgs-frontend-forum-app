import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import CardPost from '../components/CardPost';
import EditProfile from '../components/EditProfile';
import ChangePassword from '../components/ChangePassword';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserByUsername } from '../redux/actions/user';
import { FaTrashAlt, FaUserEdit } from 'react-icons/fa';
import { MdEditNote } from 'react-icons/md';
import { GoKey } from 'react-icons/go';
import { getAllPostByUserId, deletePost } from '../redux/actions/post';
import LoadingCard from '../components/LoadingCard';
import swal from 'sweetalert';

const Profile = () => {
  const dispatch = useDispatch();
  const { getUserByUsernameResult, getUserByUsernameLoading, getUserByUsernameError } = useSelector((state) => state.user);
  const userLogin = useSelector((state) => state.auth);
  const { getAllPostByUserIdResult, getAllPostByUserIdLoading, getAllPostByUserIdError, deletePostResult } = useSelector((state) => state.post);

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const { username } = useParams();

  const handleOnClose = () => {
    setShowEditProfile(false);
    setShowChangePassword(false);
  };
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
        <div className="sm:flex md:gap-5">
          <div className="w-full sm:w-[700px] lg:w-[580px] xl:w-[500px] mb-14">
            {getUserByUsernameResult ? (
              <div className="sm:fixed bg-white border w-full sm:w-[300px] md:w-[345px] p-5 overflow-hidden dark:bg-[#070D17] dark:border-borderDark dark:text-white">
                <div className="mx-auto w-64 h-64 border rounded-full overflow-hidden m-0">
                  <img src={getUserByUsernameResult.image_url} alt="Foto-profile" className="block w-full h-full" />
                </div>
                <div className="mt-3 text-center">
                  <h2 className="text-xl font-normal">{getUserByUsernameResult.username}</h2>
                  <h1 className="text-2xl font-semibold">{getUserByUsernameResult.fullname}</h1>
                  <p className="text-sm italic">{getUserByUsernameResult.roles}</p>
                  {getUserByUsernameResult.description && <p className="mt-2 text-left leading-5 text-sm">{getUserByUsernameResult.description}</p>}
                  {userLogin.username === username && (
                    <>
                      <button className="mt-7 button w-full flex bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800" onClick={() => setShowEditProfile(true)}>
                        <FaUserEdit className="w-5 h-5" />
                        Edit Profile
                      </button>
                      <button className="mt-1 button w-full flex bg-green-500 hover:bg-green-600 focus:ng-bg-green-700 active:bg-green-800" onClick={() => setShowChangePassword(true)}>
                        <GoKey className="w-5 h-5" />
                        Ubah Password
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : getUserByUsernameLoading ? (
              <LoadingCard />
            ) : (
              <p>{getUserByUsernameError ? getUserByUsernameError : 'Data Kosong'}</p>
            )}
          </div>
          <div className="w-full overflow-hidden z-10">
            <div className="border bg-white text-center p-5 mb-2 dark:bg-[#070D17] dark:border-borderDark dark:text-white">
              <h3 className="text-2xl font-semibold">Thread</h3>
            </div>
            {getAllPostByUserIdResult ? (
              <>
                {getAllPostByUserIdResult.result.length > 0 ? (
                  getAllPostByUserIdResult.result.map((post) => (
                    <div key={post.id} className="group h-64 mb-1 border p-3 rounded-md overflow-hidden bg-white relative dark:bg-[#070D17] dark:border-borderDark">
                      <CardPost post={post} />
                      {userLogin.username === username && (
                        <div className="absolute right-5 opacity-80 transition-opacity group-hover:opacity-100 bottom-3">
                          <FaTrashAlt className="w-5 h-5 transition-colors text-gray-500 cursor-pointer hover:text-gray-900" onClick={() => handleDeletePost(post.id)} />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="bg-white p-3 text-center">
                    <p className="font-medium text-base mb-1">Kosong nih Gan</p>
                    <p className="text-sm text-gray-900">Daripada diem-diem bae, mending berkarya di sini. Tuang inspirasimu disini Semuanya boleh Gan. Yang penting... Tunjukkin Aslinya!</p>
                    <Link to="/post/add" className="my-1 inline-block text-xs py-1 px-3 border rounded-sm bg-blue-400 text-gray-200 hover:bg-blue-500 transition-colors">
                      <div className="flex items-center gap-1">
                        <MdEditNote />
                        Tulis Thread
                      </div>
                    </Link>
                  </div>
                )}
              </>
            ) : getAllPostByUserIdLoading ? (
              <>
                <LoadingCard />
                <LoadingCard />
              </>
            ) : (
              <p>{getAllPostByUserIdError}</p>
            )}
          </div>
        </div>
      </div>
      {userLogin.username === username && (
        <>
          <EditProfile onClose={handleOnClose} visible={showEditProfile} isUpdated={handleUpdated} />
          <ChangePassword onClose={handleOnClose} visible={showChangePassword} />
        </>
      )}
    </Layout>
  );
};

export default Profile;
