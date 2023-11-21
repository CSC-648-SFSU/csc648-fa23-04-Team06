import React, { useState } from 'react';
import classes from './register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { request } from '../../utils/fetchApi';
import { register } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';
import { fileUpload } from '../../utils/cloudinary';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [error, setError] = useState('');
  const [emailAvailability] = useState('');
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

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    try {
      let profilePictureUrl = '';

      if (profilePicture) {
        profilePictureUrl = await fileUpload(profilePicture);
      }

      const options = { 'Content-Type': 'application/json' };

      const data = await request('/auth/register', 'POST', options, {
        username,
        email,
        password,
        profilePicture: profilePictureUrl,
      });

      dispatch(register(data));
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>🥳 Welcome to DestiGo!</h2>
        <h3>Create an account</h3>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username..."
            onChange={(e) => setUsername(e.target.value)}
            className={classes.input}
            required
          />
          <input
            type="email"
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
            className={classes.input}
            required
          />
          {emailAvailability && (
            <p className={classes.message}>{emailAvailability}</p>
          )}

          <input
            type="password"
            placeholder="Password..."
            onChange={handlePasswordChange}
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
            className={`${classes.input} ${
              isPasswordFocused ? classes.passwordInputFocused : ''
            }`}
            required
          />
          <div className={classes.passwordContainer}>
            {isPasswordFocused && (
              <div
                className={`${classes['password-indicator']} ${
                  isPasswordValid ? classes.valid : classes.invalid
                }`}
              >
                <span className="icon">{isPasswordValid}</span>
                {isPasswordValid
                  ? 'Password is secure'
                  : 'Password must be more than 8 characters'}
              </div>
            )}
          </div>

          <input
            type="file"
            onChange={handleProfilePictureChange}
            required
          />

          <button type="submit">Register</button>
          {error && <p className={classes.error}>{error}</p>}
          <h6>
            Already have an account? <Link to="/login">Login</Link>
          </h6>
        </form>
      </div>
    </div>
  );
};

export default Register;
