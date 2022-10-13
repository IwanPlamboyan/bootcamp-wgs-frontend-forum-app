import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import Layout from './Layout';
import CardThread from '../components/CardThread';
import Modal from '../components/Modal';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserByUsername } from '../redux/actions/user';

const Profile = () => {
  const dispatch = useDispatch();
  const { getUserByUsernameResult, getUserByUsernameLoading, getUserByUsernameError } = useSelector((state) => state.user);
  const userLogin = useSelector((state) => state.refreshToken);

  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState(0);
  const [subForums, setSubForums] = useState([]);
  const { username } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const handleOnClose = () => setShowModal(false);
  const handleUpdated = () => setIsUpdated(!isUpdated);

  useEffect(() => {
    dispatch(getUserByUsername(username));
  }, [dispatch, isUpdated]);

  useEffect(() => {
    getUserByUsernameResult?.id !== undefined ? setUserId(getUserByUsernameResult?.id) : setUserId(0);
    if (userId !== 0) {
      getSubForumByUserId();
    }
  }, [getUserByUsernameResult?.id, userId]);

  const getSubForumByUserId = async () => {
    const response = await axios.get(`/forum/sub/user/${userId}`);
    setSubForums(response.data.result);
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
                  <h1 className="text-2xl font-semibold">{getUserByUsernameResult.fullname}</h1>
                  <h2 className="text-xl font-normal">{getUserByUsernameResult.username}</h2>
                  {getUserByUsernameResult.description && <p className="mt-2 text-left leading-5 text-sm">{getUserByUsernameResult.description}</p>}
                  <button className={`button w-full flex ${userLogin.username !== username ? 'hidden' : ''}`} onClick={() => setShowModal(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path
                        d="m19.21 15.74-3.54 3.54c-.14.14-.27.4-.3.59l-.19 1.35c-.07.49.27.83.76.76l1.35-.19c.19-.03.46-.16.59-.3l3.54-3.54c.61-.61.9-1.32 0-2.22-.89-.89-1.6-.6-2.21.01Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path d="M18.7 16.25c.3 1.08 1.14 1.92 2.22 2.22" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M3.41 22c0-3.87 3.85-7 8.59-7 1.04 0 2.04.15 2.97.43" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
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
            {subForums.map((subForum) => (
              <div key={subForum.id} className="inline-block w-full h-64 border p-3 rounded-md overflow-hidden bg-white">
                <CardThread subForum={subForum} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {userLogin.username === username && <Modal onClose={handleOnClose} visible={showModal} isUpdated={handleUpdated} />}
    </Layout>
  );
};

export default Profile;
