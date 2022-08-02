import { useState } from 'react';
import SignIn from './components/Auth/SignIn';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/Auth/SignUp';
import Home from './components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AuthContext from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

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
    return localStorage.removeItem('user');
  };

  console.log({ user });

  const isLoggedIn = !!user?._id;

  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <AuthContext.Provider
            value={{ user, updateUser, isLoggedIn, logoutUser }}
          >
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route
                path="/login"
                element={<SignIn updateUser={updateUser} />}
              />
              <Route
                path="/register"
                element={<SignUp updateUser={updateUser} />}
              />

              <Route path="/" element={<Navigate to="/login" />} />
              <Route
                path="/login"
                element={
                  <ProtectedRoute>
                    <SignIn />
                  </ProtectedRoute>
                }
              />
              <Route path="/register" element={<SignUp />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AuthContext.Provider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
