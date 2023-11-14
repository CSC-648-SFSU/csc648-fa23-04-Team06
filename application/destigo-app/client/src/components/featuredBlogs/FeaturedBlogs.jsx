import React, { useState, useEffect } from 'react';
import classes from './featuredBlogs.module.css'
import goldentemple from '../../assets/goldentemple.png'
import losangeles from '../../assets/losangeles.png'
import sanfrancsisco from '../../assets/sanfrancisco.png'
import {MdOutlinePreview} from 'react-icons/md'
import {AiFillLike} from 'react-icons/ai'
import { useSelector } from 'react-redux';



const FeaturedBlogs = () => {
  const isNotLoggedIn = useSelector((state) => state.auth.user === null);
  const isLoggedIn = useSelector((state) => state.auth.user !== null);
  const username = useSelector((state) => state.auth.user?.username);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h3>Community</h3>
        <div className={classes.loginMessage}>
        {isNotLoggedIn && <p>Please <a href="/login">Log In</a> to explore the DestiGo Community!</p>}
        {isLoggedIn && <p>Welcome back, <span>{username}</span>! </p>}
        </div>
        <h2>Featured Posts</h2>
        <div className={classes.blogs}>
          <div className={classes.left}>
            <div className={classes.mainBlog}>
              <img src={sanfrancsisco} alt="" />
              <div className={classes.mainBlogData}>
                <div className={classes.categoryAndMetadata}>
                  <span className={classes.category}>Travel</span>
                  <div className={classes.metadata}>
                    <MdOutlinePreview /> 583 views
                  </div>
                  <div className={classes.metadata}>
                    <AiFillLike /> 29 likes
                  </div>
                </div>
                <h4>San Francisco Travel Guide</h4>
                <p className={classes.blogDesc}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa corrupti harum quidem.
                </p>
                <div className={classes.authorAndCreatedAt}>
                  <span><span>Author:</span> Faheemah</span>
                  <span><span>Created:</span> 10-09-2023</span>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.right}>
            <div className={classes.secondaryBlog}>
              <img src={losangeles} alt="" />
              <div className={classes.secondaryBlogData}>
                <h4>Best Food Spots in Los Angeles</h4>
                <p className={classes.desc}>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit, hic inventore? Atque?
                </p>
                <div className={classes.authorAndCreatedAt}>
                  <span><span>Author:</span> Ryan</span>
                  <span><span>Created:</span> 10-10-2023</span>
                </div>
              </div>
            </div>
            <div className={classes.secondaryBlog}>
              <img src={goldentemple} alt="" />
              <div className={classes.secondaryBlogData}>
                <h4>The Golden Temple</h4>
                <p className={classes.desc}>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit, hic inventore? Atque?
                </p>
                <div className={classes.authorAndCreatedAt}>
                  <span><span>Author:</span> Sahej</span>
                  <span><span>Created:</span> 10-02-2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedBlogs