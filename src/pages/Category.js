import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import Layout from './Layout';
import CardPost from '../components/CardPost';
import TagSidebar from '../components/TagSidebar';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingCard from '../components/LoadingCard';

const Category = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [lastId, setLastId] = useState(0);
  const [tempId, setTempId] = useState(0);
  const [limit, setLimit] = useState(6);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    reRenderById();
  }, [id]);

  useEffect(() => {
    getAllPostByCategoryId();
  }, [lastId, limit]);

  const reRenderById = async () => {
    const response = await axios.get(`/forum/post/category/${id}?lastId=${lastId}&limit=${limit}`);
    setPosts(response.data.result);
    setTempId(response.data.lastId);
    setHasMore(response.data.hasMore);
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

      <div className="sm:mt-7 w-full md:pr-64">
        <div className="w-full bg-white border p-5 dark:bg-[#070D17] dark:border-borderDark dark:text-white">
          <div>
            <h1 className="text-2xl font-bold text-center">Category : {posts.length > 0 ? posts[0].category.title : ''}</h1>
          </div>
        </div>
      </div>

      <div className="pb-12 bg-body dark:bg-dark">
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
              <div className="bg-white p-3 md:pr-60 dark:bg-dark">
                <p className="text-center">Data tidak ada</p>
              </div>
            )}
          </div>
        </InfiniteScroll>
      </div>
    </Layout>
  );
};

export default Category;
