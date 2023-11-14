import React, { useState } from 'react';
import classes from './login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { request } from '../../utils/fetchApi';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Variable for storing error message
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (email === '' || password === '') {
      setErrorMessage('Please fill in both email and password fields.');
      return;
    }
  
    try {
      const options = {
        'Content-Type': 'application/json',
      };
  
      const data = await request('/auth/login', 'POST', options, { email, password });
      
      if (data.user) {
        dispatch(login(data));
        navigate('/');
      } else {
        setErrorMessage('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>👋 Welcome Back!</h2>
        <h3>Log in to your account</h3>

        <form onSubmit={handleLogin}>
          {errorMessage && <p className={classes.error}>{errorMessage}</p>}       
          <input type="email" placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">{"Sign In ->"}</button>

          <h6>New to DestiGo? &nbsp;<Link to="/register">Create an account</Link></h6>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
