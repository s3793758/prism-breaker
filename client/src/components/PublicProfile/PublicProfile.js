import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'antd';
import { GET_USER } from '../../utils/queries';
import ProfileDetailsForm from '../Profile/ProfileDetailsForm';
import GameDetailsForm from '../Profile/GameDetailsForm';
import Posts from '../Posts/Posts';

const PublicProfile = () => {
  const { username } = useParams();
  let { data, loading } = useQuery(GET_USER, {
    variables: {
      username,
    },
  });

  if (loading) {
    return <p className="loading">Loading...</p>;
  }
  console.log({ userDetails: data });

  const { profileImage, first_name, last_name, posts } = data?.user || {};
  return (
    <div>
      <div style={{ width: 'inherit' }}>
        <Row gutter={[16, 16]}>
          <Col span={10}>
            <img
              src={
                profileImage ||
                'https://react.semantic-ui.com/images/wireframe/image.png'
              }
              className="profile-pic"
            />
            <div className="user-name">{first_name + ' ' + last_name}</div>
            <ProfileDetailsForm readOnly={true} />
            <GameDetailsForm readOnly={true} />
          </Col>
          <Col span={14}>
            <Posts posts={posts} />
          </Col>
        </Row>{' '}
      </div>
    </div>
  );
};

export default PublicProfile;
