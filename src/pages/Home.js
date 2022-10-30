import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import TagSidebar from '../components/TagSidebar';
import CardPost from '../components/CardPost';
import axios from '../api/axios';
import SearchBar from '../components/SearchBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingCard from '../components/LoadingCard';
import { useDispatch, useSelector } from 'react-redux';
import { resetDeletePost } from '../redux/actions/post';
import { AiOutlineLoading } from 'react-icons/ai';

const Home = () => {
  const dispatch = useDispatch();
  const { deletePostResult } = useSelector((state) => state.post);

  const [posts, setPosts] = useState([]);
  const [lastId, setLastId] = useState(0);
  const [tempId, setTempId] = useState(0);
  const [limit, setLimit] = useState(6);
  const [keyword, setKeyword] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (deletePostResult) {
      reRenderByDeletePost();
      dispatch(resetDeletePost());
    }
  }, [deletePostResult]);

  useEffect(() => {
    getPost();
  }, [lastId, keyword]);

  const reRenderByDeletePost = async () => {
    const response = await axios.get(`/forum/post?search_query=${keyword}&lastId=${0}&limit=${limit}`);
    setPosts(response.data.result);
    setTempId(response.data.lastId);
    setHasMore(response.data.hasMore);
  };

  const getPost = async () => {
    const response = await axios.get(`/forum/post?search_query=${keyword}&lastId=${lastId}&limit=${limit}`);
    const newPosts = response.data.result;
    setPosts([...posts, ...newPosts]);
    setTempId(response.data.lastId);
    setHasMore(response.data.hasMore);
  };

  const fetchMore = () => {
    setLastId(tempId);
  };

  const searchData = (e) => {
    e.preventDefault();
    setLastId(0);
    setPosts([]);
    setKeyword(query);
  };

  return (
    <Layout>
      <div className="sm:mt-7 w-full md:pr-60">
        <div className="sm:px-5">
          <SearchBar query={query} setQuery={setQuery} searchData={searchData} />
        </div>
      </div>

      <TagSidebar />

      <div className="pb-12 bg-body dark:bg-dark">
        {posts.length > 0 && (
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchMore}
            hasMore={hasMore}
            loader={
              <>
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
              </>
            }
          >
            <div className="container mx-auto pt-6 pr-2 sm:pr-0">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <div
                    key={post.id}
                    className="inline-block mx-1.5 my-1 w-full md:min-w-[400px] md:max-w-[400px] lg:max-w-[550px] xl:max-w-[400px] h-64 border p-3 rounded-md overflow-hidden bg-white shadow-lg relative dark:bg-[#070D17] dark:border-[#070D17] dark:hover:bg-black"
                  >
                    <CardPost post={post} />
                  </div>
                ))
              ) : (
                <div className="bg-white p-3 md:pr-60 dark:bg-slate-800">
                  <p className="text-center">Data tidak ada</p>
                </div>
              )}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </Layout>
  );
};

export default Home;
