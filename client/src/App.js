import { useState } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import SignIn from './components/Auth/SignIn';
import AuthContext from './context/AuthContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  const [user, setUser] = useState(null);
  if (user) {
    setUser(user);
  }
  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Header />
          <AuthContext.Provider value={{ user, setUser }}>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<SignIn />} />
            </Routes>
          </AuthContext.Provider>
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
