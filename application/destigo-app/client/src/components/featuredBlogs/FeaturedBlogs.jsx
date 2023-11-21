import React, { useEffect, useState } from 'react';
import { MdOutlinePreview } from 'react-icons/md';
import { AiFillLike } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import classes from './featuredBlogs.module.css';
import { request } from '../../utils/fetchApi';

const FeaturedBlogs = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const isNotLoggedIn = useSelector((state) => state.auth.user === null);
  const isLoggedIn = useSelector((state) => state.auth.user !== null);
  const username = useSelector((state) => state.auth.user?.username);

  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        const data = await request('/blog/featured', 'GET');
        setFeaturedBlogs(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFeaturedBlogs();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h3>Community</h3>
        <div className={classes.loginMessage}>
          {isNotLoggedIn && <p>Please <a href="/login">Log In</a> to explore the DestiGo Community!</p>}
          {isLoggedIn && <p>👋🏻 &nbsp;&nbsp;Welcome back, <span>{username}</span>! </p>}
        </div>
        <h2>Featured Posts</h2>
        <div className={classes.blogs}>
          <div className={classes.left}>
            {featuredBlogs.length > 0 && (
              <div className={classes.mainBlog}>
                <img src={featuredBlogs[0]?.photo} alt="" />
                <div className={classes.mainBlogData}>
                  <div className={classes.categoryAndMetadata}>
                    <div className={classes.metadata}>
                      <MdOutlinePreview /> {featuredBlogs[0]?.views} views
                    </div>
                    <div className={classes.metadata}>
                      <AiFillLike /> {featuredBlogs[0]?.likes?.length} likes
                    </div>
                  </div>
                  <h4>{featuredBlogs[0]?.title}</h4>
                  <p className={classes.blogDesc}>
                    {featuredBlogs[0]?.desc}
                  </p>
                  <div className={classes.authorAndCreatedAt}>
                    <span><span>Author:</span> {featuredBlogs[0]?.userId.username}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={classes.right}>
            {featuredBlogs.slice(1).map((blog, index) => (
              <div key={index} className={classes.secondaryBlog}>
                <img src={blog?.photo} alt="" />
                <div className={classes.secondaryBlogData}>
                  <h4>{blog?.title}</h4>
                  <p className={classes.desc}>
                    {blog?.desc}
                  </p>
                  <div className={classes.authorAndCreatedAt}>
                    <span><span>Author:</span> {blog?.userId.username}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
