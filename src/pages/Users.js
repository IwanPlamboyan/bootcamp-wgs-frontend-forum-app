import React, { useState, useEffect } from 'react';
import { axiosJWT } from '../api/axios';
import Layout from './Layout';
import ReactPaginate from 'react-paginate';
import SearchBar from '../components/SearchBar';
import Modal from '../components/Modal';
import { FaUserEdit } from 'react-icons/fa';
import { AiOutlineUserSwitch, AiOutlineCheck } from 'react-icons/ai';
import swal from 'sweetalert';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');
  const [msg, setMsg] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const handleOnClose = () => setShowModal(false);

  useEffect(() => {
    getUsers();
  }, [page, keyword]);

  const getUsers = async () => {
    const response = await axiosJWT.get(`/users?search_query=${keyword}&page=${page}&limit=${limit}`);
    setUsers(response.data.result);
    setPage(response.data.page);
    setPages(response.data.totalPage);
    setRows(response.data.totalRows);
  };

  const changePage = ({ selected }) => {
    setPage(selected);
    if (selected === 9) {
      setMsg('Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!');
    } else {
      setMsg('');
    }
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  };

  const handleEditRole = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosJWT.patch(`/users/moderator/${userId}`, { roles: selectedRole });
      handleOnClose();
      getUsers();
      swal('Berhasil', response.data.msg, 'success');
    } catch (error) {
      swal('Gagal!', error.response.data.msg, 'error');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-3 pb-16">
        <div className="w-full bg-white border mb-6 p-3 overflow-hidden dark:bg-[#070D17] dark:border-borderDark">
          <div className="w-full mb-4">
            <h5 className="text-3xl font-semibold text-center mt-3 mb-5 dark:text-white">Data User</h5>

            <div className="mt-3 mx-auto lg:w-[800px]">
              <SearchBar query={query} setQuery={setQuery} searchData={searchData} />
            </div>
          </div>

          <div className="mx-0 px-4 mb-2 overflow-x-auto">
            <div className="inline-block min-w-full shadow-sm rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 table-th">Foto Profile</th>
                    <th className="px-5 table-th">Username</th>
                    <th className="px-5 table-th">Email</th>
                    <th className="px-5 table-th">Roles</th>
                    <th className="px-3 table-th">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id}>
                      <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm dark:bg-[#070D17] dark:border-borderDark dark:text-white">
                        <div className="w-10 h-10">
                          <img className="w-full h-full rounded-full" src={user.image_url} alt="foto_profile" />
                        </div>
                      </td>
                      <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm dark:bg-[#070D17] dark:border-borderDark">
                        <p className="text-gray-900 whitespace-no-wrap dark:text-white">{user.username}</p>
                      </td>
                      <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm dark:bg-[#070D17] dark:border-borderDark">
                        <p className="text-gray-900 whitespace-no-wrap dark:text-white">{user.email}</p>
                      </td>
                      <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm dark:bg-[#070D17] dark:border-borderDark">
                        <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${user.roles === 'moderator' ? 'text-green-900' : user.roles === 'admin' ? 'text-blue-900' : 'text-slate-900'}`}>
                          <span aria-hidden className={`absolute inset-0 opacity-50 rounded-full ${user.roles === 'moderator' ? 'bg-green-200' : user.roles === 'admin' ? 'bg-blue-200' : 'bg-slate-200'}`}></span>
                          <span className="relative">{user.roles}</span>
                        </span>
                      </td>
                      <td className="border-b border-gray-200 bg-white text-sm dark:bg-[#070D17] dark:border-borderDark dark:text-white">
                        {user.roles !== 'admin' ? (
                          <button
                            type="button"
                            className="flex justify-center items-center gap-1 rounded-sm bg-green-400 py-1 px-3 text-gray-500 hover:text-gray-700 hover:bg-green-500 hover:shadow-md transition-colors"
                            onClick={() => {
                              setShowModal(true);
                              setSelectedRole(user.roles);
                              setUserId(user.id);
                              setUsername(user.username);
                            }}
                          >
                            <FaUserEdit className="w-4 h-4" />
                            <p>Edit</p>
                          </button>
                        ) : (
                          <button className="flex justify-center items-center gap-1 rounded-sm bg-green-400 py-1 px-3 text-gray-500 opacity-40 cursor-auto">
                            <FaUserEdit className="w-4 h-4" />
                            <p>Edit</p>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-sm dark:text-white">
            Total Rows: {rows} Page : {rows ? page + 1 : 0} of {pages}
          </p>
          <p className="text-center text-red-800 dark:text-red-400">{msg}</p>
          <nav key={rows}>
            <ReactPaginate
              previousLabel={'< Prev'}
              nextLabel={'Next >'}
              pageCount={Math.min(10, pages)}
              onPageChange={changePage}
              containerClassName="list-none flex justify-center items-center mb-5 text-sm gap-1"
              pageLinkClassName="py-2 px-4 rounded font-normal hover:bg-blue-500 hover:text-white border-2 transition-colors dark:text-white"
              previousClassName={`py-2 px-4 rounded font-normal border-2 transition-colors ${page === 0 ? 'opacity-50 cursor-default' : 'hover:bg-blue-800 hover:text-white'}`}
              nextLinkClassName={`py-2 px-4 rounded font-normal border-2 transition-colors ${page + 1 === pages ? 'opacity-50 cursor-default' : 'hover:bg-blue-800 hover:text-white'}`}
              activeLinkClassName="bg-blue-800 text-white"
            />
          </nav>
        </div>
      </div>

      <Modal onClose={handleOnClose} visible={showModal}>
        <div className="flex justify-center gap-2 items-center mb-5">
          <AiOutlineUserSwitch className="w-7 h-7" />
          <h1 className="font-semibold text-2xl text-gray-700 dark:text-white">Edit Role User</h1>
        </div>

        <form onSubmit={handleEditRole}>
          <div className="mt-2 py-5 px-5 w-full font-medium h-40">
            <div className="w-full p-2 flex items-center justify-center text-lg">Username : {username}</div>

            <ul className="bg-white mt-1 list-none max-h-20 overflow-y-auto cursor-pointer">
              <li className={`flex justify-between p-2 text-sm border dark:bg-dark dark:border-borderDark ${selectedRole === 'moderator' ? 'bg-blue-700 dark:bg-blue-700 text-white' : ''}`} onClick={() => setSelectedRole('moderator')}>
                Moderator
                {selectedRole === 'moderator' ? <AiOutlineCheck className="mr-2" /> : ''}
              </li>
              <li className={`flex justify-between p-2 text-sm border dark:bg-dark dark:border-borderDark ${selectedRole === 'user' ? 'bg-blue-700 dark:bg-blue-700 text-white' : ''}`} onClick={() => setSelectedRole('user')}>
                User
                {selectedRole === 'user' ? <AiOutlineCheck className="mr-2" /> : ''}
              </li>
            </ul>
          </div>

          <div className="mt-10 flex justify-end gap-3">
            <button type="button" className="button bg-red-500 hover:bg-red-600" onClick={() => handleOnClose()}>
              Close
            </button>
            <button type="submit" className="button">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </Layout>
  );
};

export default Users;
