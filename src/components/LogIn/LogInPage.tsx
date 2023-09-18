// src/LoginPage.tsx

import React, { useState } from 'react';
import './LogInPage.css';
import { useNavigate } from 'react-router-dom';
const LogInPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  const handleLogin = () => {
    // Add your login logic here, e.g., send a request to your server
    console.log('Username:', username);
    console.log('Password:', password);
    navigate('/home');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="button" className='login_bttn' onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LogInPage;
