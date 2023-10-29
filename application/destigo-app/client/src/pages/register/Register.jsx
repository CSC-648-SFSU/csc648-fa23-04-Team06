import React, { useState } from 'react';
import classes from './register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { request } from '../../utils/fetchApi';
import { register } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length >= 8) {
      setIsPasswordValid(true);
      setError('');
    } else {
      setIsPasswordValid(false);
    }
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (username === '' || email === '' || password === '') return;

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    try {
      const options = { 'Content-Type': 'application/json' };

      const data = await request('/auth/register', 'POST', options, {
        username,
        email,
        password,
      });
      dispatch(register(data));
      navigate('/login'); // Navigate to the "/login" page after successful registration
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Username..." onChange={(e) => setUsername(e.target.value)} className={classes.input}/>
          <input type="email" placeholder="Email..." onChange={(e) => setEmail(e.target.value)} className={classes.input} />

          <input type="password" placeholder="Password..." onChange={handlePasswordChange} onFocus={handlePasswordFocus} 
          onBlur={handlePasswordBlur} className={`${classes.input} ${
              isPasswordFocused ? classes.passwordInputFocused : ''
            }`} />
            
          <div className={classes.passwordContainer}>
            {isPasswordFocused && (
              <div
                className={`${classes['password-indicator']} ${
                  isPasswordValid ? classes.valid : classes.invalid
                }`}
              >
                <span className="icon">{isPasswordValid}</span>
                {isPasswordValid
                  ? 'Password is valid'
                  : 'Password must be more than 8 characters'}
              </div>
            )}
          </div>

          <button type="submit">Register</button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
