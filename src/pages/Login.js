import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // mengimport hooks useNavigate untuk redirect
import { useDispatch, useSelector } from 'react-redux'; // mengimport hooks useDispacth dan useSelector
import { login, refreshToken } from '../redux/actions/auth'; //mengimport action login

const Login = () => {
  // mendeklarasikan hooks module untuk siap dipakai
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // mengimport state dari store mengenai login dengan useSelector
  const { accessToken } = useSelector((state) => state.auth);

  // membuat beberapa state yang dibutuhkan oleh input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // fungsi login submit
  const Login = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
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

  return (
    <div className="w-full h-screen bg-gray-200 flex flex-col justify-center dark:bg-dark">
      <form onSubmit={Login} className="max-w-[400px] w-full mx-auto bg-gray-50 p-8 px-8 rounded-lg dark:bg-[#070D17] dark:border-[#070D17]">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white">LOGIN</h2>
        <div className={`${email.length > 0 ? 'text-gray-800' : 'text-gray-400'} flex flex-col py-2`}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg bg-gray-100 ring-1 mt-2 p-2 focus:ring-sky-500 invalid:text-pink-600 focus:outline-none dark:bg-[#070D17] dark:border-[#070D17] dark:text-white dark:invalid:text-pink-600"
            required
            autoFocus
          />
        </div>
        <div className={`flex flex-col text-gray-400 py-2 ${password.length > 0 ? 'text-gray-800' : 'text-gray-400'}`}>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-lg bg-gray-100 ring-1 mt-2 p-2 focus:ring-sky-500 focus:outline-none dark:bg-[#070D17] dark:border-[#070D17]" required />
        </div>
        <button className="w-full mt-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/10 text-white font-semibold rounded-lg">LOGIN</button>
        <Link to="/register" className="flex justify-center text-slate-400 text-xs mt-[10px] hover:text-slate-500 transition-colors">
          Belum punya akun? register
        </Link>
      </form>
    </div>
  );
};

export default Login;
