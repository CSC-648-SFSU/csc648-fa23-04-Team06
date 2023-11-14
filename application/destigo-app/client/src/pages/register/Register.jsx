import React, { useState, useEffect } from 'react';
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
  const [emailAvailability, setEmailAvailability] = useState('');
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

  //checking to see if the email was used
  const checkEmailAvailability = async () => {
    try {
      const options = { 'Content-Type': 'application/json' };
      const response = await request('/auth/check-email', 'POST', options, {
        email,
      });

      setEmailAvailability(response.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (email === '') {
      setEmailAvailability('');
      return;
    }
    checkEmailAvailability();
  }, [email]);



  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>🥳 Welcome to DestiGo!</h2>
        <h3> Create an account</h3>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Username..." onChange={(e) => setUsername(e.target.value)} className={classes.input}/>
          <input type="email" placeholder="Email..." onChange={(e) => setEmail(e.target.value)} className={classes.input} />
          {emailAvailability && <p className={classes.message}>{emailAvailability}</p>}

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
                  ? 'Password is secure'
                  : 'Password must be more than 8 characters'}
              </div>
            )}
          </div>

          <button type="submit">{"Register ->"} <Link to="/login"></Link></button>
          <h6>
            Already have an account? <Link to="/login">Login</Link>
          </h6>
        </form>
      </div>
    </div>
  );
};

export default Register;
