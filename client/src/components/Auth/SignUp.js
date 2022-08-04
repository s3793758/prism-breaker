import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Input, Select } from 'antd';
import './auth.css';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../../utils/mutations';

const { Option } = Select;

const initialState = {
  first_name: '',
  last_name: '',
  username: '',
  gender: 'Male',
  email: '',
  password: '',
  cpassword: '',
  phone: '',
  dateOfBirth: '',
};

function SignUp() {
  const [state, setState] = useState(initialState);
  const [form] = Form.useForm();
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [regiserUser] = useMutation(REGISTER_USER);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleGenderChange = (value) => {
    setState((prevState) => {
      return {
        ...prevState,
        gender: value,
      };
    });
  };

  const handleSubmit = async () => {
    // event.preventDefault();
    console.log({ state });

    const allFieldsEntered = Object.keys(state).every(
      (item) => state[item].trim() !== ''
    );

    console.log({ allFieldsEntered });
    if (!allFieldsEntered) {
      setErrorMsg('Please enter all the fields.');
      return;
    }

    if (state.phone.trim().length !== 10) {
      setErrorMsg('Please enter valid 10 digit phone number.');
      return;
    }

    if (state.password.trim() !== state.cpassword.trim()) {
      setErrorMsg('Password and confirm password are not matching..');
      return;
    }
    setErrorMsg('');
    console.log(state);

    try {
      const { cpassword, ...rest } = state;
      /* const { data } = await axios.post(`${BASE_API_URL}/register`, {
        ...rest,
      });*/
      const { data } = await regiserUser({
        variables: {
          input: {
            ...rest,
          },
        },
      });
      setSuccessMsg('User is registered successfully.');
      setState(initialState);
      console.log('response', data);
    } catch (error) {
      console.log(error);
      setErrorMsg(error.message);
      setSuccessMsg('');
    }
  };

  console.log({ state });
  return (
    <div className="sign-up">
      <div style={{ marginBottom: '20px' }}>
        <p> Sign up to Prisim-Breaker</p>
      </div>
      <hr />
      <Form
        onFinish={handleSubmit}
        form={form}
        name="userForm"
        colon={false}
        requiredMark="optional"
        labelAlign="left"
      >
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
        {successMsg && <p className="success-msg">{successMsg}</p>}
        <Form.Item>
          <label className="input-label">First Name</label>
          <Input
            label="first_name"
            type="text"
            name="first_name"
            value={state.first_name}
            placeholder="First name"
            onChange={handleOnChange}
          />
        </Form.Item>
        <Form.Item>
          <label className="input-label">Last Name</label>
          <Input
            type="text"
            label="last_name"
            name="last_name"
            value={state.last_name}
            placeholder="Last name"
            onChange={handleOnChange}
          />
        </Form.Item>
        <Form.Item>
          <label className="input-label">Username</label>
          <Input
            type="text"
            label="username"
            name="username"
            value={state.username}
            placeholder="Username"
            onChange={handleOnChange}
          />
        </Form.Item>
        <Form.Item>
          <label className="input-label">Email</label>
          <Input
            type="email"
            name="email"
            label="email"
            placeholder="Email"
            value={state.email}
            onChange={handleOnChange}
          />
        </Form.Item>
        <Form.Item>
          <label className="input-label">Phone number</label>
          <Input
            type="number"
            name="phone"
            label="phone"
            placeholder="phone number"
            value={state.phone}
            onChange={handleOnChange}
          />
        </Form.Item>
        <Form.Item>
          <label className="input-label">Password</label>
          <Input
            type="password"
            name="password"
            label="password"
            value={state.password}
            placeholder="Password"
            onChange={handleOnChange}
          />
        </Form.Item>
        <Form.Item>
          <label className="input-label">Confirm Password</label>
          <Input
            type="password"
            name="cpassword"
            label="cpassword"
            value={state.cpassword}
            placeholder="Confirm Password"
            onChange={handleOnChange}
          />
        </Form.Item>
        <Form.Item>
          <label className="input-label">Date of birth</label>
          <Input
            type="date"
            name="dateOfBirth"
            label="dateOfBirth"
            value={state.dateOfBirth}
            placeholder="Date of birth "
            onChange={handleOnChange}
          />
        </Form.Item>
        <Form.Item>
          <label className="input-label">Gender</label>
          <Select
            defaultValue={state.gender}
            name="gender"
            label="gender"
            onChange={handleGenderChange}
          >
            <Option value="">Please select a gender</Option>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <hr />
      </Form>
    </div>
  );
}

export default SignUp;
