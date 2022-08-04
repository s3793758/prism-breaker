import React, { useContext, useState } from 'react';
import { DownOutlined, MoreOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import './posts.css';
import { useMutation } from '@apollo/client';
import { DELETE_POST } from '../../utils/mutations';
import AuthContext from '../../context/AuthContext';
import { GET_ALL_POSTS, GET_USER_POSTS } from '../../utils/queries';

const Posts = ({ posts }) => {
  console.log({ pp: posts });
  const { user } = useContext(AuthContext);
  const [selectedPost, setSelectedPost] = useState(-1);
  const [deletePost] = useMutation(DELETE_POST);

  const menu = (
    <Menu
      items={[
        {
          key: 'delete',
          label: (
            <a rel="noopener noreferrer" href="#/">
              Delete Post
            </a>
          ),
          onClick: async ({ key }) => {
            if (key === 'delete') {
              await deletePost({
                variables: {
                  postId: selectedPost,
                  userId: user._id,
                },
                refetchQueries: [
                  { query: GET_ALL_POSTS },
                  {
                    query: GET_USER_POSTS,
                    variables: {
                      userId: user._id,
                    },
                  },
                ],
              });
            }
          },
        },
      ]}
    />
  );

  console.log({ userPosts: posts });
  return (
    <ul className="posts-list">
      {posts?.map((post) => {
        const { _id, userId, postMessage, postImage, createdAt } = post;
        return (
          <li className="list-item" key={_id}>
            <img
              src={userId?.profileImage}
              alt={userId?.first_name}
              className="post-pic"
              width={50}
              height={50}
            />
            <div className="post-content">
              <div>
                <div className="post-author">
                  {(userId?.first_name || '') + ' ' + (userId?.last_name || '')}
                  {' . '}
                  <span>
                    {createdAt
                      ? new Date(+createdAt).toLocaleDateString('en-us', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                        })
                      : ''}
                  </span>
                </div>
                {postImage && (
                  <div>
                    <img
                      src={postImage}
                      alt={postMessage}
                      className="post-image"
                    />
                  </div>
                )}
                <div className="post-message">{postMessage}</div>
              </div>
            </div>
            {userId?._id === user._id && (
              <div className="more-icon">
                <Dropdown overlay={menu} trigger={['click']}>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('e', e);
                      setSelectedPost(_id);
                    }}
                  >
                    <DownOutlined className="down-arrow" />
                  </a>
                </Dropdown>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Posts;
