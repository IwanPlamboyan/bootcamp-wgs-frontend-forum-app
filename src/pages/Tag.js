import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from './Layout';
import CardPost from '../components/CardPost';
import { getAllPostByCategoryId } from '../redux/actions/post';

const Tag = () => {
  const dispatch = useDispatch();
  const { getAllPostByCategoryIdResult, getAllPostByCategoryIdLoading, getAllPostByCategoryIdError } = useSelector((state) => state.post);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllPostByCategoryId(id));
  }, []);

  return (
    <Layout>
      <div className="container md:pr-[36%] lg:pr-[32%] xl:pr-[24%] py-6 px-2">
        <div className="w-full bg-white border p-5">
          <div>
            <h1 className="text-4xl font-bold">Category : {getAllPostByCategoryIdResult ? getAllPostByCategoryIdResult.result[0].category.title : ''}</h1>
          </div>
        </div>

        <div className="container mx-auto py-6">
          {getAllPostByCategoryIdResult ? (
            getAllPostByCategoryIdResult.result.map((post) => (
              <div key={post.id} className="inline-block m-1 w-[400px] h-64 border p-3 rounded-md overflow-hidden bg-white relative">
                <CardPost post={post} key={post.id} />
              </div>
            ))
          ) : getAllPostByCategoryIdLoading ? (
            <p>Laading...</p>
          ) : (
            <p>{getAllPostByCategoryIdError ? getAllPostByCategoryIdError : 'Data Kosong'}</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Tag;
