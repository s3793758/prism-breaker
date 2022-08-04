import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Select } from 'antd';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { UPDATE_GAME_DETAILS } from '../../utils/mutations';
import { GET_GAME_DETAILS } from '../../utils/queries';
import './profileform.css';

const { Option } = Select;

const GameDetailsForm = ({ readOnly }) => {
  let { user, searchedUser } = useContext(AuthContext);

  if (!searchedUser) {
    searchedUser = user.username;
  }
  const { data } = useQuery(GET_GAME_DETAILS, {
    variables: {
      username: readOnly ? searchedUser : user.username,
    },
  });
  console.log({ data });

  const [race, setRace] = useState({
    index: '',
    name: '',
    url: '',
  });
  const [selectedClass, setSelectedClass] = useState({
    index: '',
    name: '',
    url: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [racesList, setRacesList] = useState([]);
  const [classesList, setClassesList] = useState([]);
  const [form] = Form.useForm();
  const [updateGameDetails] = useMutation(UPDATE_GAME_DETAILS);
  useEffect(() => {
    const getRaces = async () => {
      try {
        const { data } = await axios.get('https://www.dnd5eapi.co/api/races');
        setRacesList(data?.results);
      } catch (error) {
        console.log(error);
      }
    };
    getRaces();

    const getClasses = async () => {
      try {
        const { data } = await axios.get('https://www.dnd5eapi.co/api/classes');
        setClassesList(data?.results);
      } catch (error) {
        console.log(error);
      }
    };

    getClasses();
  }, []);

  console.log({ lists: racesList });
  console.log({ classes: classesList });

  useEffect(() => {
    if (data?.gameDetails) {
      const { race, selectedClass } = data?.gameDetails || {};
      const { index, name, url } = race || {};
      const {
        index: classIndex,
        name: className,
        url: classUrl,
      } = selectedClass || {};
      setRace({
        index,
        name,
        url,
      });
      setSelectedClass({
        index: classIndex,
        name: className,
        url: classUrl,
      });
    }
  }, [data?.gameDetails]);

  const handleRaceTypeChange = (value) => {
    const selectedRace = racesList.find((item) => item.index === value);
    setRace(selectedRace);
  };

  const handleClassChange = (value) => {
    const classItem = classesList.find((item) => item.index === value);
    setSelectedClass(classItem);
  };

  console.log({ race });

  const handleSubmit = async () => {
    try {
      debugger;
      const { data } = await updateGameDetails({
        variables: {
          input: {
            race: {
              ...race,
            },
            selectedClass: {
              ...selectedClass,
            },
            userId: user._id,
          },
        },
      });
      console.log({ racedetails: data?.addGameDetails });

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
          <h2>Race Details</h2>
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
          {successMsg && <p className="success-msg">{successMsg}</p>}

          <Form.Item>
            <label>Please select a race</label>
            <Select
              value={race.index}
              name="race"
              label="Race Type"
              onChange={handleRaceTypeChange}
            >
              <Option value="">Please select your race type</Option>
              {racesList.map((raceItem) => (
                <Option value={raceItem.index} key={raceItem.index}>
                  {raceItem.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <label>Please select a class</label>
            <Select
              value={selectedClass.index}
              name="class"
              label="Class"
              onChange={handleClassChange}
            >
              <Option value="">Please select your class</Option>
              {classesList.map((classItem) => (
                <Option value={classItem.index} key={classItem.index}>
                  {classItem.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Update
          </Button>
          <hr />
        </Form>
      ) : (
        <>
          <h2 style={{ marginTop: '1rem' }}>Race Details</h2>
          <div className="user-info">
            <div>User Race: {race.index}</div>
            <div>User Class: {selectedClass.index}</div>
          </div>
        </>
      )}
    </>
  );
};

export default GameDetailsForm;
