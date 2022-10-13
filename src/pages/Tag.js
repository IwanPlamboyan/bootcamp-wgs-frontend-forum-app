import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Layout from './Layout';
import CardThread from '../components/CardThread';

const Tag = () => {
  const [subForums, setSubForums] = useState([]);
  const [tag, setTag] = useState('');
  const { id } = useParams();

  useEffect(() => {
    getAllSubForumByMainId();
  }, []);

  const getAllSubForumByMainId = async () => {
    const response = await axios.get(`http://localhost:5000/forum/tag/${id}`);
    setSubForums(response.data.result);
    setTag(response.data.result[0].main_forum.title);
  };

  return (
    <Layout>
      <div className="container md:pr-[36%] lg:pr-[32%] xl:pr-[24%] py-6 px-2">
        <div className="w-full bg-white border p-5">
          <div>
            <h1 className="text-4xl font-bold">Category : {tag}</h1>
          </div>
        </div>

        <div className="container mx-auto py-6">
          {subForums.map((subForum) => (
            <div key={subForum.id} className="inline-block m-1 w-[400px] h-64 border p-3 rounded-md overflow-hidden bg-white">
              <CardThread subForum={subForum} key={subForum.id} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Tag;
