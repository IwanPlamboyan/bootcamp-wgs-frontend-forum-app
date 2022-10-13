import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { axiosJWT } from '../api/axios';
import { useSelector, useDispatch } from 'react-redux';
import { refreshToken } from '../redux/actions/refreshToken';

const Modal = ({ onClose, visible, isUpdated }) => {
  const dispatch = useDispatch();
  const { getUserByUsernameResult } = useSelector((state) => state.user);

  const [id, setId] = useState('');
  const [fullName, setFullName] = useState('');
  const [fotoProfile, setFotoProfile] = useState('');
  const [preview, setPreview] = useState('');
  const [description, setDescription] = useState();

  useEffect(() => {
    setId(getUserByUsernameResult?.id);
    setFullName(getUserByUsernameResult?.fullname);
    setDescription(getUserByUsernameResult?.description);
    setPreview(getUserByUsernameResult?.image_url);
  }, [getUserByUsernameResult]);

  const handleOnClose = (e) => {
    if (e.target.id === 'container' || e.target.id === 'icon-close' || e.target.id === 'button-close') onClose();
  };

  if (!visible) return null;

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFotoProfile(image);
    setPreview(URL.createObjectURL(image));
  };

  const onSubmitEditProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullname', fullName);
    formData.append('description', description);
    formData.append('foto_profile', fotoProfile);
    try {
      await axiosJWT.patch(`/users/${id}`, formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      onClose();
      swal('Berhasil', 'Data Profile berhasil di ubah', 'success');
      isUpdated();
      dispatch(refreshToken());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="container" onClick={handleOnClose} className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-20">
      <div className="bg-white px-8 py-5 rounded w-[480px] relative">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" className="absolute top-3 right-3 hover:cursor-pointer" id="icon-close">
          <path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10ZM9.17 14.83l5.66-5.66M14.83 14.83 9.17 9.17" stroke="#FF8A65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>

        <div className="flex justify-center gap-2 items-center mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" className="inline">
            <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path
              d="m19.21 15.74-3.54 3.54c-.14.14-.27.4-.3.59l-.19 1.35c-.07.49.27.83.76.76l1.35-.19c.19-.03.46-.16.59-.3l3.54-3.54c.61-.61.9-1.32 0-2.22-.89-.89-1.6-.6-2.21.01Z"
              stroke="black"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path d="M18.7 16.25c.3 1.08 1.14 1.92 2.22 2.22" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M3.41 22c0-3.87 3.85-7 8.59-7 1.04 0 2.04.15 2.97.43" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <h1 className="font-semibold text-2xl text-gray-700">Edit Profile</h1>
        </div>

        <form onSubmit={onSubmitEditProfile}>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">Username</span>
            <input type="text" disabled className="input-edit-profile" value={getUserByUsernameResult?.username} />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">Email</span>
            <input type="email" disabled className="input-edit-profile" value={getUserByUsernameResult?.email} />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">Nama Lengkap</span>
            <input type="text" className="input-edit-profile" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </label>
          <div className="flex items-center gap-2 mb-4">
            <div className="shrink-0">
              <img className="h-16 w-16 object-cover rounded-full img-preview" src={preview} alt="Foto_profile" />
            </div>
            <label className="block w-full">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                id="image"
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-100 file:text-violet-700 hover:file:bg-violet-100 hover:cursor-pointer"
                onChange={loadImage}
              />
            </label>
          </div>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">Description</span>
            <textarea className="input-edit-profile resize-y h-20" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </label>
          <div className="flex justify-end gap-3">
            <button className="button bg-red-500 hover:bg-red-600" id="button-close">
              Close
            </button>
            <button type="submit" className="button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
