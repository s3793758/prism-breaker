import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import AuthContext from './context/AuthContext';
import './App.css';
import { Image } from 'antd';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AppDrawer from './components/AppDrawer/AppDrawer';
import ProtectedRoute from './components/ProtectedRoute/ProtectRoute';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import PublicProfile from './components/PublicProfile/PublicProfile';

function App() {
  const [searchedUser, setSearchedUser] = useState('');
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

  const updateSearchText = (searchText) => {
    setSearchedUser(searchText);
  };

  console.log({ user });

  const isLoggedIn = !!user?._id;
  console.count('rendered');

  return (
    <div className="App">
      <AppDrawer isLoggedIn={isLoggedIn} />
      <div className="container app-container">
        <BrowserRouter>
          <AuthContext.Provider
            value={{
              user,
              updateUser,
              isLoggedIn,
              logoutUser,
              searchedUser,
              updateSearchText,
            }}
          >
            <Header />
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/register" element={<SignUp />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/profile/:username" element={<PublicProfile />} />
            </Routes>
            <Footer />
          </AuthContext.Provider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
