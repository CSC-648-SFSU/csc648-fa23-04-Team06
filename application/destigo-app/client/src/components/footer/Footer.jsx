import React from 'react'
import classes from './footer.module.css'

const Footer = () => {
  return (
    <footer>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>About DestiGo.</h2>
          <p>DestiGo is a revolutionary one-stop travel app that transforms the way travelers plan and experience their journeys. We offer an all-in-one platform that seamlessly integrates hotels, flights, events, and everything in between.
          </p>
        </div>
        <div className={classes.col}>
          <h2>Contacts</h2>
          <span>Phone: +1(415) 857-2221</span>
          <span>Email: hello@example.com</span>
          <span>GitHub: example </span>
        </div>
        <div className={classes.col}>
          <h2>Location</h2>
          <span><strong>Thornton Hall 325</strong></span>
          <span>1600 Holloway Ave.</span>
          <span>San Francisco, CA 94015</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer