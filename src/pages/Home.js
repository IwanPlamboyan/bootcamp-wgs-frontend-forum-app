import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import TagSidebar from '../components/TagSidebar';
import CardPost from '../components/CardPost';
import axios from '../api/axios';
import SearchBar from '../components/SearchBar';
import InfiniteScroll from 'react-infinite-scroll-component';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [lastId, setLastId] = useState(0);
  const [tempId, setTempId] = useState(0);
  const [limit, setLimit] = useState(6);
  const [keyword, setKeyword] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getPost();
  }, [lastId, keyword]);

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

      <InfiniteScroll dataLength={posts.length} next={fetchMore} hasMore={hasMore} loader={<h4>Loading...</h4>}>
        <div className="container mx-auto py-6 pr-2 sm:pl-2">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="inline-block m-1 w-full sm:w-[400px] h-64 border p-3 rounded-md overflow-hidden bg-white shadow-lg relative dark:bg-dark">
                <CardPost post={post} />
              </div>
            ))
          ) : (
            <div className="bg-white p-3 md:pr-60 dark:bg-dark">
              <p className="text-center">Data tidak ada</p>
            </div>
          )}
        </div>
      </InfiniteScroll>
    </Layout>
  );
};

export default Home;
