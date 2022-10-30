import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // mengimport hooks useNavigate untuk redirect
import { useDispatch, useSelector } from 'react-redux'; // mengimport hooks useDispacth dan useSelector
import { register, resetRegister, refreshToken } from '../redux/actions/auth'; // mengimport action register
// import swal from 'sweetalert';

const Register = () => {
  // mendeklarasikan hooks module untuk siap dipakai
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // mengimport beberapa state mengenai register dengan useSelector
  const { registerResult, accessToken } = useSelector((state) => state.auth);

  // membuat beberapa state yang dibutuhkan oleh input
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // fungsi register submit
  const Register = async (e) => {
    e.preventDefault();
    dispatch(
      register({
        username,
        email,
        password,
        confirmPassword,
        roles: 'user',
      })
    );
  };

  // Pada saat componentDidMount jalankan refreshToken supaya mengisi state di store apakah sudah login atau tidak
  useEffect(() => {
    dispatch(refreshToken());
  }, []);

  useEffect(() => {
    // jika sudah login maka redirect ke halaman home
    if (accessToken) {
      navigate('/');
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    // jika state registerResult bernilai true, ada nilainya atau registernya berhasil maka redirect ke halaman login
    if (registerResult) {
      navigate('/login');
      dispatch(resetRegister());
    }
  }, [dispatch, registerResult]);

  return (
    <div className="w-full h-screen bg-gray-200 flex flex-col justify-center dark:bg-dark">
      <form onSubmit={Register} className="max-w-[450px] w-full mx-auto bg-gray-50 p-8 px-8 rounded-lg dark:bg-[#070D17] dark:border-[#070D17]">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white">REGISTER</h2>
        <div className={`flex flex-col text-gray-400 py-2 ${username.length > 0 ? 'text-gray-800 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}`}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-lg bg-gray-100 ring-1 mt-2 p-2 focus:ring-sky-500 focus:outline-none dark:bg-[#070D17] dark:border-[#070D17] dark:text-white"
            required
            autoFocus
          />
        </div>
        <div className={`flex flex-col text-gray-400 py-2 ${email.length > 0 ? 'text-gray-800 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}`}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg bg-gray-100 ring-1 mt-2 p-2 focus:ring-sky-500 invalid:text-pink-600  focus:outline-none dark:bg-[#070D17] dark:border-[#070D17] dark:text-white"
            required
          />
        </div>
        <div className="flex gap-x-1">
          <div className={`flex flex-col text-gray-400 py-2 overflow-hidden ${password.length > 0 ? 'text-gray-800 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}`}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg bg-gray-100 ring-1 mx-1 mt-2 p-2 focus:ring-sky-500 focus:outline-none dark:bg-[#070D17] dark:border-[#070D17] dark:text-white"
              required
            />
          </div>
          <div className={`flex flex-col text-gray-400 py-2 ${confirmPassword.length > 0 ? 'text-gray-800 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}`}>
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="rounded-lg bg-gray-100 ring-1 mx-1 mt-2 p-2 focus:ring-sky-500 focus:outline-none dark:bg-[#070D17] dark:border-[#070D17] dark:text-white"
              required
            />
          </div>
        </div>
        <button type="submit" className="w-full mt-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/10 text-white font-semibold rounded-lg">
          REGISTER
        </button>
        <Link to="/login" className="flex justify-center text-slate-400 text-xs mt-[10px] hover:text-slate-300">
          Sudah punya akun? Login
        </Link>
      </form>
    </div>
  );
};

export default Register;
