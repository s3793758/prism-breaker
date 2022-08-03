import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'antd';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import AuthContext from '../../context/AuthContext';

function SignIn() {
  const [form] = Form.useForm();
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');

  const [loginUser] = useMutation(LOGIN_USER);
  useEffect(() => {
    if (user?._id) {
      navigate('/profile');
    }
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    const allFieldsEntered = Object.keys(state).every(
      (item) => state[item].trim() !== ''
    );
    if (!allFieldsEntered) {
      setErrorMsg('Please enter all the fields.');
      return;
    }

    setErrorMsg('');
    console.log(state);

    try {
      /*  const { data } = await axios.post(`${BASE_API_URL}/login`, {
        ...state,
      });
      console.log(data);*/

      const { data } = await loginUser({
        variables: {
          ...state,
        },
      });
      console.log(data?.login);
      localStorage.setItem('user', JSON.stringify(data?.login));
      navigate('/home');
      updateUser(data?.login);
    } catch (error) {
      console.log(error);
      if (error?.response?.data) {
        setErrorMsg(error?.response?.data);
      }
    }
  };

  console.log('signin page');

  return (
    <div className="sign-in" style={{ position: 'relative' }}>
      <div style={{ marginBottom: '20px' }}>
        <p> Sign in to Prisim-Breaker</p>
      </div>
      <Form onFinish={handleSubmit} form={form} name="loginForm">
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
        <Form.Item>
          <input
            type="email"
            name="email"
            value={state.email}
            placeholder="Email"
            onChange={handleOnChange}
          />
        </Form.Item>
        <Form.Item>
          <input
            type="password"
            name="password"
            value={state.password}
            placeholder="Password"
            onChange={handleOnChange}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>

      <div style={{ fontSize: '12px', margin: '20px 0' }}>
        <p>
          <span>Forgotten account?</span>{' '}
          <Link className="signup-link" to="/register">
            Sign up for Prisim-Breaker
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
