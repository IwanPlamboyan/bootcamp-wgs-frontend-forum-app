import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import TagSidebar from '../components/TagSidebar';
import CardThread from '../components/CardThread';
import axios from '../api/axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const Home = () => {
  const [subForums, setSubForums] = useState([]);
  const [lastId, setLastId] = useState(0);
  const [tempId, setTempId] = useState(0);
  const [limit, setLimit] = useState(20);
  const [keyword, setKeyword] = useState('');
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getSubForum();
  }, [lastId, keyword]);

  const getSubForum = async () => {
    const response = await axios.get(`/forum/sub?search_query=${keyword}&lastId=${lastId}&limit=${limit}`);
    const newSubForums = response.data.result;
    setSubForums([...subForums, ...newSubForums]);
    setTempId(response.data.lastId);
    setHasMore(response.data.hasMore);
  };

  const fetchMore = () => {
    setLastId(tempId);
  };

  return (
    <Layout>
      <TagSidebar />
      <InfiniteScroll dataLength={subForums.length} next={fetchMore} hasMore={hasMore} loader={<h4>Loading...</h4>}>
        <div className="container mx-auto py-6 px-2">
          {subForums.map((subForum) => (
            <div key={subForum.id} className="inline-block m-1 w-[400px] h-64 border p-3 rounded-md overflow-hidden bg-white shadow-lg">
              <CardThread subForum={subForum} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </Layout>
  );
};

export default Home;
