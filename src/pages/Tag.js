import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from './Layout';
import CardThread from '../components/CardThread';
import { getAllSubForumByMainId } from '../redux/actions/subForum';

const Tag = () => {
  const dispatch = useDispatch();
  const { getAllSubForumByMainIdResult, getAllSubForumByMainIdLoading, getAllSubForumByMainIdError } = useSelector((state) => state.subForum);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllSubForumByMainId(id));
  }, []);

  return (
    <Layout>
      <div className="container md:pr-[36%] lg:pr-[32%] xl:pr-[24%] py-6 px-2">
        <div className="w-full bg-white border p-5">
          <div>
            <h1 className="text-4xl font-bold">Category : {getAllSubForumByMainIdResult ? getAllSubForumByMainIdResult.result[0].main_forum.title : ''}</h1>
          </div>
        </div>

        <div className="container mx-auto py-6">
          {getAllSubForumByMainIdResult ? (
            getAllSubForumByMainIdResult.result.map((subForum) => (
              <div key={subForum.id} className="inline-block m-1 w-[400px] h-64 border p-3 rounded-md overflow-hidden bg-white relative">
                <CardThread subForum={subForum} key={subForum.id} />
              </div>
            ))
          ) : getAllSubForumByMainIdLoading ? (
            <p>Laading...</p>
          ) : (
            <p>{getAllSubForumByMainIdError ? getAllSubForumByMainIdError : 'Data Kosong'}</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Tag;
