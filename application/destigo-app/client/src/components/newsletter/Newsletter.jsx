import React, { useState } from 'react';
import classes from './newsletter.module.css';
import { FiCheckCircle, FiSend } from 'react-icons/fi';
import { request } from '../../utils/fetchApi'; // Path to BASE_URL (FetchApi.js file) to avoid using multiple URLs.


const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  const handleSubmit = async () => {
    try {
      const responseData = await request('/api/subscribe', 'POST', {
        'Content-Type': 'application/json',
      }, { email });

      if (responseData) {
        // Handle success
        setSubscriptionStatus('success');
        setEmail(''); // Clear the input field after submit
        console.log('Subscription successful:', responseData.message);
      } else {
        // Handle errors
        setSubscriptionStatus('failure');
        console.error('Subscription failed:', responseData.message);
      }
    } catch (error) {
      console.error('Error during subscription:', error.message);
      setSubscriptionStatus('failure');
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Want to get the latest updates?</h5>
          <h2>Subscribe to our newsletter, and we will do the rest!</h2>
        </div>
        <div className={classes.inputContainer}>
          <input
            type="email"
            placeholder="Email address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FiSend className={classes.sendIcon} onClick={handleSubmit} />
        </div>
        {subscriptionStatus === 'success' && (
          <p className={classes.successMessage}><FiCheckCircle/> Thanks for subscribing!</p>
        )}
        {subscriptionStatus === 'failure' && (
          <p className={classes.errorMessage}>Subscription failed. Please try again.</p>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
