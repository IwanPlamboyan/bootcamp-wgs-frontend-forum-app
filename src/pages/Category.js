import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import Layout from './Layout';
import CardPost from '../components/CardPost';
import TagSidebar from '../components/TagSidebar';
import InfiniteScroll from 'react-infinite-scroll-component';

const Category = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [lastId, setLastId] = useState(0);
  const [tempId, setTempId] = useState(0);
  const [limit, setLimit] = useState(8);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    reRenderById();
  }, [id]);

  useEffect(() => {
    getAllPostByCategoryId();
  }, [lastId, limit]);

  const reRenderById = async () => {
    setPosts([]);
    setLastId(0);
    setTempId(0);
    setHasMore(true);
    const response = await axios.get(`/forum/post/category/${id}?lastId=${lastId}&limit=${limit}`);
    setPosts(response.data.result);
  };

  const getAllPostByCategoryId = async () => {
    const response = await axios.get(`/forum/post/category/${id}?lastId=${lastId}&limit=${limit}`);
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

      <div className="container md:pr-[36%] lg:pr-[32%] xl:pr-[24%] py-6 px-2">
        <div className="w-full bg-white border p-5">
          <div>
            <h1 className="text-2xl font-bold text-center">Category : {posts.length > 0 ? posts[0].category.title : ''}</h1>
          </div>
        </div>
      </div>

      <InfiniteScroll dataLength={posts.length} next={fetchMore} hasMore={hasMore} loader={posts ? '' : <h4>Loading...</h4>}>
        <div className="container mx-auto py-6 px-2">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="inline-block m-1 w-[400px] h-64 border p-3 rounded-md overflow-hidden bg-white shadow-lg relative">
                <CardPost post={post} />
              </div>
            ))
          ) : (
            <div className="bg-white p-3 md:pr-60">
              <p className="text-center">Data tidak ada</p>
            </div>
          )}
        </div>
      </InfiniteScroll>
    </Layout>
  );
};

export default Category;
