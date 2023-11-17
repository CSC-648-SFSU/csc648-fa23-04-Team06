import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import classes from "./blogDetails.module.css";
import { useSelector } from "react-redux";
import { request } from "../../utils/fetchApi";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { format } from "timeago.js";
import { MdOutlinePreview } from "react-icons/md";

import {
  AiFillEdit,
  AiFillLike,
  AiFillDelete,
  AiOutlineArrowLeft,
  AiOutlineLike,
} from "react-icons/ai";

const BlogDetails = () => {
  const [blogDetails, setBlogDetails] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const { id } = useParams();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const options = { Authorization: `Bearer ${token}` };
        const data = await request(`/blog/find/${id}`, "GET", options);
        setBlogDetails(data);
        setIsLiked(data.likes.includes(user._id));
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogDetails();
  }, [id]);

  // like
  const handleLikePost = async () => {
    try {
      const options = { Authorization: `Bearer ${token}` };
      await request(`/blog/likeBlog/${id}`, "PUT", options);

      // Update the like count in the blogDetails state
      setBlogDetails((prevBlogDetails) => {
        const updatedBlogDetails = { ...prevBlogDetails };
        if (isLiked) {
          // User unliked, decrement like count
          updatedBlogDetails.likes = updatedBlogDetails.likes.filter(
            (userId) => userId !== user._id
          );
        } else {
          // User liked, increment like count
          updatedBlogDetails.likes.push(user._id);
        }
        return updatedBlogDetails;
      });

      // Toggle the isLiked state
      setIsLiked((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  // delete
  const handleDeleteBlog = async () => {
    try {
      const options = { Authorization: `Bearer ${token}` };
      await request(`/blog/deleteBlog/${id}`, "DELETE", options);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <Link to="/blog" className={classes.goBack}>
          <AiOutlineArrowLeft /> Go Back
        </Link>
        <div className={classes.wrapper}>
          <img src={`${blogDetails?.photo}`} />
          <div className={classes.titleAndControls}>
            <h3 className={classes.title}>{blogDetails?.title}</h3>
            {blogDetails?.userId?._id === user._id ? (
              <div className={classes.controls}>
                <Link
                  to={`/updateBlog/${blogDetails?._id}`}
                  className={classes.edit}
                >
                  <AiFillEdit />
                </Link>
                <div className={classes.delete}>
                  <AiFillDelete onClick={handleDeleteBlog} />
                </div>
              </div>
            ) : (
              <>
                {isLiked ? (
                  <div className={classes.like} onClick={handleLikePost}>
                    <AiFillLike />
                  </div>
                ) : (
                  <div className={classes.like} onClick={handleLikePost}>
                    <AiOutlineLike />
                  </div>
                )}
              </>
            )}
          </div>
          <div className={classes.descAndLikesViews}>
            <p className={classes.desc}>{blogDetails?.desc}</p>
            <div className={classes.likesAndViews}>
              <span>{blogDetails?.views} views</span>
              <span>{blogDetails?.likes?.length} likes</span>
            </div>
          </div>
          <div className={classes.authorAndCreatedAt}>
          <div className={classes.userInfo}>
              <img src={blogDetails?.userId?.profilePicture}/>             
              <p>{blogDetails?.userId?.username}</p>

              </div>
              
            <span>
              <span>Created:</span> {format(blogDetails?.createdAt)}
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetails;
