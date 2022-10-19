import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import TagSidebar from '../components/TagSidebar';
import CardPost from '../components/CardPost';
import axios from '../api/axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [lastId, setLastId] = useState(0);
  const [tempId, setTempId] = useState(0);
  const [limit, setLimit] = useState(20);
  const [keyword, setKeyword] = useState('');
  const [hasMore, setHasMore] = useState(true);

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

  return (
    <Layout>
      <TagSidebar />
      <InfiniteScroll dataLength={posts.length} next={fetchMore} hasMore={hasMore} loader={<h4>Loading...</h4>}>
        <div className="container mx-auto py-6 px-2">
          {posts.map((post) => (
            <div key={post.id} className="inline-block m-1 w-[400px] h-64 border p-3 rounded-md overflow-hidden bg-white shadow-lg relative">
              <CardPost post={post} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </Layout>
  );
};

export default Home;
