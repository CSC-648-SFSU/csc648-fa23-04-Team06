import React from "react";
import { useState } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import classes from "./create.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { request } from "../../utils/fetchApi";
import { fileUpload } from "../../utils/cloudinary";

const Create = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const categories = [
    "travel stories",
    "events",
    "food & dining",
    "photography",
    "flight experience",
  ];

  const onChangeFile = (e) => {
    setImg(e.target.files[0]);
  };

  const handleCloseImg = () => {
    setImg(null);
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    try {
      let filename = null;
      if (img) {
        const url = await fileUpload(img);
        filename = url;
      } else {
        return;
      }

      const options = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const body = {
        title,
        desc,
        category,
        photo: filename,
      };

      console.log(body);
      const data = await request("/blog", "POST", options, body);
      navigate(`/blogDetails/${data._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const isLoggedIn = useSelector((state) => state.auth.user !== null);
  const username = useSelector((state) => state.auth.user?.username);


  return (
    <>
      <Navbar />
      
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <h2 className={classes.title}>Create a post</h2>
          <form onSubmit={handleCreateBlog} encType="multipart/form-data">
            <div className={classes.inputWrapper}>
              <input
                type="text"
                placeholder="Title..."
                className={classes.input}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={classes.inputWrapper}>
              <textarea
                placeholder="Description..."
                className={classes.inputDesc}
                onChange={(e) => setDesc(e.target.value)}
                rows="5" // Adjust this value based on the desired initial number of visible lines
              />
            </div>
            <div className={classes.inputWrapperSelect}>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={crypto.randomUUID()} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className={classes.inputWrapperImg}>
              <label htmlFor="image" className={classes.labelFileInput}>
                <span>Upload an Image....</span> <p>Supported: PNG, JPG, JPEG</p>
              </label>
              <input
                id="image"
                type="file"
                className={classes.input}
                onChange={onChangeFile}
                style={{ display: "none" }}
              />
              {img && (
                <p className={classes.imageName}>
                  {img.name}{" "}
                  <AiOutlineCloseCircle
                    className={classes.closeIcon}
                    onClick={() => handleCloseImg()}
                  />
                </p>
              )}
            </div>
            <div className={classes.buttonWrapper}>
              <button className={classes.submitBtn} type="submit">
                Create Post
              </button>
              {isLoggedIn && (
              <p>
             <span>  Post Author: {username}</span>
              </p>
            )}
              <p>Creating a post on DestiGo means agreeing to our Privacy Policy, reinforcing our commitment to a secure online environment.</p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Create;
