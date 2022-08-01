import { useState } from 'react';
import SignIn from './components/Auth/SignIn';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/Auth/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [user, setUser] = useState(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user')) || null;
      return user;
    } catch (error) {
      return null;
    }
  });

  const updateUser = (user) => {
    if (user) {
      setUser(user);
    }
  };

  const logoutUser = async () => {
    try {
      localStorage.removeItem('user');
      setUser(null);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  console.log({ user });

  const isLoggedIn = !!user?._id;
  console.count('rendered');

  return (
    <div className="App">
      <div className="container app-container">
        <SignIn />
      </div>
    </div>
  );
}

export default App;
