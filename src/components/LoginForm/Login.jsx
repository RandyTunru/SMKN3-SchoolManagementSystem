import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import smkn3makassarLogo from '../Assets/smkn3makassar.png';
import axios from 'axios';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setErrorMessage('Username dan password harus diisi');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:1337/api/auth/local', {
        identifier: username,
        password: password,
      });

      const { jwt, user } = response.data;
      if (user) {
        setErrorMessage('');
        localStorage.setItem('role', user.accountType);
        localStorage.setItem('jwt', jwt); // Store JWT for future authenticated requests
        localStorage.setItem('nama', user.nama);
        localStorage.setItem('id', user.id);
        redirectToPage(user.accountType);
      } else {
        setErrorMessage('Username atau password salah');
      }
    } catch (err) {
      setErrorMessage('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const redirectToPage = (role) => {
    switch (role) {
      case 'admin':
        navigate('/dashboard');
        break;
      case 'teacher':
        navigate('/teacher-dashboard');
        break;
      case 'headmaster':
        navigate('/headmaster-dashboard');
        break;
      case 'viceprincipal':
        navigate('/vice-principal-dashboard');
        break;
      default:
        setErrorMessage('Peran pengguna tidak dikenali');
    }
  };

  return (
    <div className='login-page'>
      <div className='header-login flex items-center pl-4'>
        <h2>Learning Management System</h2>
      </div>
      <div className="login-wrapper">
        <h1>Welcome to Learning Management System</h1>
        <img className="logo mt-3" src={smkn3makassarLogo} alt="logo"/>
        <form onSubmit={handleLogin}>
          <div>
            <input 
              type="text" 
              className="input-box" 
              placeholder='Username' 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input 
              type="password" 
              className="input-box" 
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="login-button" type="submit" disabled={loading}>Login</button>
          {loading && <p className='text-black'>Loading...</p>}
          {errorMessage && <p className="text-black">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
