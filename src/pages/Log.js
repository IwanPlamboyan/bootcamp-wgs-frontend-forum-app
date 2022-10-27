import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import ReactPaginate from 'react-paginate';
import { axiosJWT } from '../api/axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Log = () => {
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.auth);
  const { openSidebar } = useSelector((state) => state.sidebar);

  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (username !== 'admin') {
      return navigate('/');
    }
    getLog();
  }, [page, keyword]);

  const getLog = async () => {
    const response = await axiosJWT.get(`/log?search_query=${keyword}&page=${page}&limit=${limit}`);
    setLogs(response.data.result);
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

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="mt-[72px]">
        <div className={`container mx-auto pr-2 transition-all duration-700 ${openSidebar && username ? 'pl-[95px]' : 'pl-2'}`}>
          <div className="container mx-auto py-3 pb-16">
            <div className="w-full bg-white border mb-6 py-3 px-2 overflow-hidden">
              <div className="w-full mb-4">
                <h5 className="text-3xl font-semibold text-center mt-3 mb-5">Data Log</h5>

                <div className="mt-3 mx-auto lg:w-[800px]">
                  <SearchBar query={query} setQuery={setQuery} searchData={searchData} />
                </div>
              </div>

              <div className="mx-0 px-1 mb-2 overflow-x-auto">
                <div className="inline-block min-w-full shadow-sm rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-1 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">No</th>
                        <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Username</th>
                        <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                        <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Role</th>
                        <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Ip Client</th>
                        <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Request Method</th>
                        <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Endpoint</th>
                        <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status Code</th>
                        <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Content Length</th>
                        <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Response Time</th>
                        <th className="px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">TimeStamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logs.map((log, index) => (
                        <tr key={log.id}>
                          <td className="px-1 py-3 border-b border-gray-200 bg-white text-sm">{index + 1}.</td>
                          <td className="px-4 py-3 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{log.username}</p>
                          </td>
                          <td className="px-4 py-3 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{log.email}</p>
                          </td>
                          <td className="px-4 py-3 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{log.roles}</p>
                          </td>
                          <td className="px-4 py-3 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{log.client_ip}</p>
                          </td>
                          <td className="px-4 py-3 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{log.request_method}</p>
                          </td>
                          <td className="px-4 py-3 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{log.endpoint}</p>
                          </td>
                          <td className="px-4 py-3 border-b border-gray-200 bg-white text-sm">
                            <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${log.status_code === '200' ? 'text-green-100' : ''}`}>
                              <span aria-hidden className={`absolute inset-0 opacity-50 rounded-full ${log.status_code === '200' ? 'bg-green-600' : ''}`}></span>
                              <span className="relative">{log.status_code}</span>
                            </span>
                          </td>
                          <td className="px-4 py-3 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{log.content_length}</p>
                          </td>
                          <td className="px-4 py-3 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{log.response_time} ms</p>
                          </td>
                          <td className="px-4 py-3 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">{moment(log.createdAt).format('LL')}</p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <p className="text-sm">
                Total Rows: {rows} Page : {rows ? page + 1 : 0} of {pages}
              </p>
              <p className="text-center text-red-800">{msg}</p>
              <nav key={rows}>
                <ReactPaginate
                  previousLabel={'< Prev'}
                  nextLabel={'Next >'}
                  pageCount={Math.min(1000, pages)}
                  onPageChange={changePage}
                  containerClassName="list-none flex justify-center items-center mb-5 text-sm gap-1"
                  pageLinkClassName="py-2 px-4 rounded font-normal hover:bg-blue-500 hover:text-white border-2 transition-colors"
                  previousClassName="py-2 px-4 rounded font-normal hover:bg-blue-500 hover:text-white border-2 transition-colors"
                  nextLinkClassName="py-2 px-4 rounded font-normal hover:bg-blue-500 hover:text-white border-2 transition-colors"
                  activeLinkClassName="bg-blue-500 text-white"
                />
              </nav>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Log;
