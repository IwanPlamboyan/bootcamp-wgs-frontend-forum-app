import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { useSelector, useDispatch } from 'react-redux';
import { editProfile, resetEditProfile } from '../redux/actions/user';
import { FaUserEdit } from 'react-icons/fa';
import { SlClose } from 'react-icons/sl';
import { refreshToken } from '../redux/actions/auth';

const Modal = ({ onClose, visible, isUpdated }) => {
  const dispatch = useDispatch();
  const { getUserByUsernameResult, editProfileResult, editProfileError } = useSelector((state) => state.user);

  const [id, setId] = useState('');
  const [fullName, setFullName] = useState('');
  const [fotoProfile, setFotoProfile] = useState('');
  const [preview, setPreview] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setId(getUserByUsernameResult?.id);
    setFullName(getUserByUsernameResult?.fullname ? getUserByUsernameResult.fullname : '');
    setDescription(getUserByUsernameResult?.description ? getUserByUsernameResult.description : '');
    setPreview(getUserByUsernameResult?.image_url);
  }, [getUserByUsernameResult]);

  useEffect(() => {
    if (editProfileResult) {
      onClose();
      swal('Berhasil', 'Data Profile berhasil di ubah', 'success');
      isUpdated();
      dispatch(refreshToken());
      dispatch(resetEditProfile());
    }
  }, [editProfileResult]);

  useEffect(() => {
    if (editProfileError) {
      swal('Berhasil', editProfileError, 'error');
      dispatch(resetEditProfile());
    }
  }, [editProfileError]);

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
    dispatch(editProfile(id, formData));
  };

  return (
    <div id="container" onClick={handleOnClose} className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white px-8 py-5 rounded w-[480px] relative">
        <SlClose className="w-7 h-7 z-50 absolute top-3 right-3 hover:cursor-pointer text-red-400" id="icon-close" />

        <div className="flex justify-center gap-2 items-center mb-5">
          <FaUserEdit className="w-7 h-7" />
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
