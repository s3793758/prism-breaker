import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { GET_ALL_POSTS } from '../../utils/queries';
import Header from '../Header/Header';
import Posts from '../Posts/Posts';
import './home.css';

const Home = () => {
  const { data = [], loading } = useQuery(GET_ALL_POSTS);
  console.log(data);

  if (loading) {
    return <p className="loading">Loading posts...</p>;
  }

  return (
    <div>
      <Posts posts={data?.posts} />
    </div>
  );
};

export default Home;
