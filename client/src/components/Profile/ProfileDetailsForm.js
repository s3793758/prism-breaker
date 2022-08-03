import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Select } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { UPDATE_USER_DETAILS } from '../../utils/mutations';
import { GET_USER_DETAILS } from '../../utils/queries';
import './profileform.css';

const { Option } = Select;

const ProfileDetailsForm = ({ readOnly }) => {
  let { user, searchedUser } = useContext(AuthContext);
  if (!searchedUser) {
    searchedUser = user.username;
  }
  console.log({ readOnly, profileuser: user.username, searchedUser });
  const { data } = useQuery(GET_USER_DETAILS, {
    variables: {
      username: readOnly ? searchedUser : user.username,
    },
  });
  console.log({ data });

  const [state, setState] = useState({
    gamingName: '',
    userRole: '',
    location: '',
    playingPreference: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [form] = Form.useForm();
  const [updateUserDetails] = useMutation(UPDATE_USER_DETAILS);

  useEffect(() => {
    if (data?.userDetails) {
      const { gamingName, userRole, location, playingPreference } =
        data?.userDetails || {};
      setState({
        gamingName: gamingName ? gamingName : '',
        userRole: userRole ? userRole : '',
        location: location ? location : '',
        playingPreference: playingPreference ? playingPreference : '',
      });
    }
  }, [data?.userDetails]);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleRoleChange = (value) => {
    setState((prevState) => {
      return {
        ...prevState,
        userRole: value,
      };
    });
  };

  const handlePreferenceChange = (value) => {
    setState((prevState) => {
      return {
        ...prevState,
        playingPreference: value,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      console.log({ state });

      const { data } = await updateUserDetails({
        variables: {
          input: {
            ...state,
            userId: user._id,
          },
        },
      });
      console.log({ userdetails: data?.addUserDetails });
      setErrorMsg('');
      setSuccessMsg('Details are successfully updated.');
      setTimeout(() => {
        setSuccessMsg('');
      }, 3000);
    } catch (error) {
      console.log(error);
      setErrorMsg('Error while updading details. Please try again.');
      setSuccessMsg('');
    }
  };
  return (
    <>
      {!readOnly ? (
        <Form
          onFinish={handleSubmit}
          form={form}
          name="userDetailsForm"
          className="user-details"
        >
          <h2>User Details</h2>
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
          {successMsg && <p className="success-msg">{successMsg}</p>}
          <Form.Item>
            <input
              type="text"
              name="gamingName"
              value={state.gamingName}
              placeholder="Enter your gaming name"
              onChange={handleOnChange}
            />
          </Form.Item>
          <Form.Item>
            <Select
              value={state.userRole}
              name="userRole"
              label="User Role"
              onChange={handleRoleChange}
            >
              <Option value="">Please select your role</Option>
              <Option value="admin">Admin</Option>
              <Option value="host">Host</Option>
              <Option value="participant">Participant</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <input
              type="text"
              name="location"
              value={state.location}
              placeholder="Enter your location"
              onChange={handleOnChange}
            />
          </Form.Item>

          <Form.Item>
            <Select
              value={state.playingPreference}
              name="playingPreference"
              label="Playing Preference"
              onChange={handlePreferenceChange}
            >
              <Option value="">Playing Preference</Option>
              <Option value="online">Online</Option>
              <Option value="inperson">In-Person</Option>
              <Option value="both">Both</Option>
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form>
      ) : (
        <>
          <h2>User Details</h2>
          <div className="user-info">
            <div>Gaming Name: {state.gamingName}</div>
            <div>User Role: {state.userRole}</div>
            <div>Location: {state.location}</div>
            <div>Playing Preference: {state.playingPreference}</div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileDetailsForm;
