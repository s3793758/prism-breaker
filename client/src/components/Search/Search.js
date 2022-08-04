import React, { useContext, useState } from 'react';
import './search.css';
import { Form, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Search = ({ toggleSearch }) => {
  const { updateSearchText } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  const handleOnChange = (event) => {
    setSearchText(event.target.value);
  };
  const handleSubmit = () => {
    console.log({ searchText });
    updateSearchText(searchText);
    toggleSearch(false);
    navigate(`/profile/${searchText}`);
  };
  return (
    <div className="search-box">
      <Form onFinish={handleSubmit} form={form} className="search-form">
        <Form.Item>
          <input
            type="search"
            name="searchText"
            value={searchText}
            className="search-input"
            placeholder="Enter username to search"
            onChange={handleOnChange}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form>
      <hr />
    </div>
  );
};

export default Search;
