import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Layout from './Layout';
import SearchBar from '../components/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, resetAddCategory, editCategory, resetEditCategory, deleteCategory, resetDeleteCategory } from '../redux/actions/category';
import { IoMdArrowDropright } from 'react-icons/io';
import { BsTrash, BsPlusCircle } from 'react-icons/bs';
import { TbEdit } from 'react-icons/tb';
import swal from 'sweetalert';

const Categories = () => {
  const dispatch = useDispatch();
  const { roles } = useSelector((state) => state.auth);
  const { addCategoryResult, editCategoryResult, deleteCategoryResult } = useSelector((state) => state.category);

  const [categories, setCategories] = useState([]);
  const [lastId, setLastId] = useState(0);
  const [temptId, setTempId] = useState(0);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');
  const [hasMore, setHasMore] = useState('');

  useEffect(() => {
    getCategories(true);
  }, [lastId, keyword]);

  useEffect(() => {
    if (addCategoryResult) {
      getCategories(false);
      dispatch(resetAddCategory());
    }
    if (editCategoryResult) {
      getCategories(false);
      dispatch(resetEditCategory());
    }
    if (deleteCategoryResult) {
      getCategories(false);
      dispatch(resetDeleteCategory());
    }
  }, [addCategoryResult, editCategoryResult, deleteCategoryResult]);

  const getCategories = async (scroll) => {
    const response = await axios.get(`/forum/category?search_query=${keyword}&lastId=${lastId}&limit=${limit}`);
    const newCategories = response.data.result;
    if (scroll) {
      setCategories([...categories, ...newCategories]);
    } else {
      setCategories(newCategories);
    }
    setTempId(response.data.lastId);
    setHasMore(response.data.hasMore);
  };

  const fetchMore = () => {
    setLastId(temptId);
  };

  const searchData = (e) => {
    e.preventDefault();
    setLastId(0);
    setCategories([]);
    setKeyword(query);
  };

  const handleCreate = () => {
    swal({
      title: 'Tambah Category',
      buttons: [true, 'Tambah'],
      content: {
        element: 'input',
      },
    }).then((value) => {
      if (value) {
        dispatch(addCategory({ title: value }));
      }
    });
  };

  const handleEdit = (id, title) => {
    swal({
      title: 'Edit Category',
      buttons: [true, 'Ubah'],
      content: {
        element: 'input',
        attributes: {
          value: title,
        },
      },
    }).then((value) => {
      if (value) {
        dispatch(editCategory(id, { id, title: value }));
      }
    });
  };

  const handleDelete = (id) => {
    swal({
      title: 'DELETE',
      text: 'Apakah anda yakin ingin menghapusnya?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCategory(id));
      }
    });
  };

  return (
    <Layout>
      <div className="container mx-auto py-3 lg:w-[850px] pb-16">
        <div className="w-full bg-white border mb-6 p-3 dark:bg-[#070D17] dark:border-borderDark dark:text-white">
          <p className="text-3xl font-medium text-center">Category Forum</p>
          <div className="mt-5">
            <SearchBar query={query} setQuery={setQuery} searchData={searchData} />
          </div>
        </div>

        {roles === 'moderator' || roles === 'admin' ? (
          <button className="mb-3 flex items-center gap-1 bg-blue-500 hover:bg-blue-600 transition-colors rounded-sm px-8 py-2 text-gray-100 hover:shadow-sm" onClick={handleCreate}>
            <BsPlusCircle />
            <p>Tambah</p>
          </button>
        ) : (
          ''
        )}

        <InfiniteScroll dataLength={categories.length} next={fetchMore} hasMore={hasMore} loader={<h4>Loading...</h4>}>
          <>
            {categories.map((category, index) => (
              <div className="mb-1 flex justify-between items-center gap-1 sm:gap-3" key={category.id}>
                {roles === 'moderator' || roles === 'admin' ? <p className="bg-white py-3 px-2 sm:px-5 border rounded-sm dark:bg-[#070D17] dark:border-borderDark dark:text-white">{index + 1}.</p> : ''}

                <Link to={`/category/${category.id}`} className="group link-categories">
                  <p className="text-base transition-transform duration-500 group-hover:text-blue-500 group-hover:translate-x-1">{category.title}</p>
                  <IoMdArrowDropright className="w-6 h-6 ease-in-out transition-transform duration-700 group-hover:translate-x-2 group-hover:text-blue-400" />
                </Link>

                {roles === 'moderator' || roles === 'admin' ? (
                  <>
                    <button className="button-action-category sm:px-3.5 bg-green-500 hover:bg-green-600 hover:shadow-lg" onClick={() => handleEdit(category.id, category.title)}>
                      <TbEdit className="w-4 h-4" />
                      <p className="text-sm">Edit</p>
                    </button>
                    <button className="button-action-category sm:px-2 bg-red-500 hover:bg-red-600 hover:shadow-lg" onClick={() => handleDelete(category.id)}>
                      <BsTrash className="w-4 h-4" />
                      <p className="text-sm">Hapus</p>
                    </button>
                  </>
                ) : (
                  ''
                )}
              </div>
            ))}
          </>
        </InfiniteScroll>
      </div>
    </Layout>
  );
};

export default Categories;
