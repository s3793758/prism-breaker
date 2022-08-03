import React, { useContext, useRef, useState } from 'react';
import Header from '../Header/Header';
import { CameraOutlined, UploadOutlined } from '@ant-design/icons';
import { Col, Row, Upload, Form, Button, Input } from 'antd';
import axios from 'axios';
import { useMutation, useQuery } from '@apollo/client';
import {
  ADD_POST,
  UPLOAD_POST_IMAGE,
  UPLOAD_PROFILE_IMAGE,
} from '../../utils/mutations';
import './profile.css';
import AuthContext from '../../context/AuthContext';
import { GET_ALL_POSTS, GET_USER_POSTS } from '../../utils/queries';
import Posts from '../Posts/Posts';
import ProfileDetailsForm from './ProfileDetailsForm';
import GameDetailsForm from './GameDetailsForm';

const { TextArea } = Input;

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { data = [] } = useQuery(GET_USER_POSTS, {
    variables: {
      userId: user._id,
    },
  });
  console.log(data);
  const [uploadImage] = useMutation(UPLOAD_PROFILE_IMAGE);
  const [errorMsg, setErrorMsg] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postMessage, setPostMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [addPost] = useMutation(ADD_POST);
  const [uploadPostImage] = useMutation(UPLOAD_POST_IMAGE);
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },

    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file?.originFileObj, info.fileList);

        const file = info.file?.originFileObj;
        const reader = new FileReader();
        setLoading(true);
        reader.readAsDataURL(file);
        reader.onloadend = async function () {
          console.log('res', reader.result);
          try {
            const { data } = await uploadImage({
              variables: {
                image: reader.result,
                userId: JSON.parse(localStorage.getItem('user'))._id || '',
              },
            });
            console.log('uploaded', data?.uploadProfileImage);
            const userInfo = JSON.parse(localStorage.getItem('user'));
            userInfo.profileImage = data?.uploadProfileImage?.profileImage;
            localStorage.setItem('user', JSON.stringify(userInfo));
            setLoading(false);
            setRefresh((refresh) => !refresh);
            setErrorMsg('');
          } catch (error) {
            console.log(error);
            setLoading(false);
            setErrorMsg(
              'Something went wrong while uploading. Try again later.'
            );
          }
        };
      }
    },
  };

  const handleInputChange = (event) => {
    setPostMessage(event.target.value);
  };

  const handlePostImageChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    setPostImage(selectedFile);
  };

  const handleFormSubmit = async () => {
    console.log({ postMessage });
    try {
      const { data } = await addPost({
        variables: {
          postMessage,
          userId: user._id,
        },
        refetchQueries: [
          {
            query: GET_USER_POSTS,
            variables: {
              userId: user._id,
            },
          },
          {
            query: GET_ALL_POSTS,
          },
        ],
      });
      setPostMessage('');

      console.log('postId', data?.addPost?._id);

      if (postImage) {
        await uploadPostImage({
          variables: {
            file: postImage,
            userId: user._id,
            postId: data?.addPost?._id,
          },
          refetchQueries: [
            {
              query: GET_USER_POSTS,
              variables: {
                userId: user._id,
              },
            },
            {
              query: GET_ALL_POSTS,
            },
          ],
        });
      }

      setSuccessMessage('Post is added successfully.');
      setPostImage(null);
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  let image = '';
  try {
    image =
      JSON.parse(localStorage.getItem('user'))?.profileImage ||
      'https://react.semantic-ui.com/images/wireframe/image.png';
  } catch (error) {
    image = 'https://react.semantic-ui.com/images/wireframe/image.png';
  }
  console.log({ image });

  console.log('dt:', data);

  return (
    <div>
      <div style={{ width: 'inherit' }}>
        <Row gutter={[16, 16]}>
          <Col span={10}>
            {' '}
            <img src={image} className="profile-pic" />
            <div className="user-name">
              {user.first_name + ' ' + user.last_name}
            </div>
            <div>
              <Upload {...props} showUploadList={false}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>

              <div>
                {loading && <p className="success-msg">Uploading...</p>}
              </div>
              <div>{errorMsg && <p className="error-msg">{errorMsg}</p>}</div>
            </div>
            <ProfileDetailsForm readOnly={false} />
            <GameDetailsForm readOnly={false} />
          </Col>
          <Col span={14}>
            <Form onFinish={handleFormSubmit}>
              {successMessage && (
                <p className="success-msg">{successMessage}</p>
              )}
              <Form.Item className="comments-form">
                <TextArea
                  rows={4}
                  placeholder="Tell us more"
                  name="postMessage"
                  value={postMessage}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <br></br>
              <div
                style={{ textAlign: 'left' }}
                className="comments-form-controls"
              >
                <div>
                  {/*{' '}
                  <Upload {...uploadImageProps} showUploadList={false}>
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                  </Upload>
                  */}
                  <input type="file" onChange={handlePostImageChange} />
                  {/* <Button>Video</Button> */}
                </div>
                <div>
                  <Button type="primary" htmlType="submit">
                    Post
                  </Button>
                </div>
              </div>
            </Form>
            <Posts posts={data?.posts} />
          </Col>
        </Row>{' '}
      </div>
    </div>
  );
};

export default Profile;
