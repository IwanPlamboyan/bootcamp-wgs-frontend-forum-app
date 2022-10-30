import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changePassword, resetChangePassword } from '../redux/actions/user';
import Modal from './Modal';
import swal from 'sweetalert';
import { GoKey } from 'react-icons/go';

const ChangePassword = ({ onClose, visible }) => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);
  const { changePasswordResult, changePasswordError } = useSelector((state) => state.user);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  useEffect(() => {
    if (changePasswordResult) {
      onClose();
      swal('Berhasil', 'Data Profile berhasil di ubah', 'success');
      dispatch(resetChangePassword());
      setCurrentPassword('');
      setNewPassword('');
      setRepeatPassword('');
    }
    if (changePasswordError) {
      swal('Berhasil', changePasswordError, 'error');
      dispatch(resetChangePassword());
    }
  }, [changePasswordResult, changePasswordError]);

  const onSubmitChangePassword = async (e) => {
    e.preventDefault();

    dispatch(changePassword(userId, { currentPassword, newPassword, repeatPassword }));
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <div className="flex justify-center gap-2 items-center mb-5">
        <GoKey className="w-7 h-7" />
        <h1 className="font-semibold text-2xl text-gray-700 dark:text-white">Change Password</h1>
      </div>

      <form onSubmit={onSubmitChangePassword} className="mt-8 mb-5">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 dark:text-white">Password Sekarang</span>
          <input type="password" className="input-change-password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} autoFocus />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 dark:text-white">Password Baru</span>
          <input type="password" className="input-change-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 dark:text-white">Ulangi Password</span>
          <input type="password" className="input-change-password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
        </label>
        <div className="mt-5 flex justify-end gap-3">
          <button type="button" className="button bg-red-500 hover:bg-red-600" onClick={() => onClose()}>
            Close
          </button>
          <button type="submit" className="button">
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ChangePassword;
