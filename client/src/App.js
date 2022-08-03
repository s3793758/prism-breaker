import { useState } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import SignIn from './components/Auth/SignIn';
import AuthContext from './context/AuthContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Navbar from './components/Nav/Navbar';

function App() {
  const [user, setUser] = useState(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user')) || null;
      return user;
    } catch (error) {
      return null;
    }
  });

  console.log({ user });

  const isLoggedIn = !!user?._id;
  console.count('rendered');

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
  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <AuthContext.Provider
            value={{ user, updateUser, isLoggedIn, logoutUser }}
          >
            <Header />
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<SignIn />} />
            </Routes>
            <Footer />
          </AuthContext.Provider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
