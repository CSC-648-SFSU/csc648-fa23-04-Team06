import React, { useEffect, useState } from "react";
import { request } from "../../utils/fetchApi";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import classes from "./categories.module.css";
import { MdOutlinePreview } from "react-icons/md";
import { AiFillLike, AiFillStar } from "react-icons/ai";
import {
  AiFillPlusCircle,
  AiFillClockCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { FiArrowRight } from "react-icons/fi";

const Categories = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [selectedSearchCriteria, setSelectedSearchCriteria] = useState("title");
  const categories = [
    "all",
    "travel stories",
    "events",
    "food & dining",
    "Photography",
    "flight experience",
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await request("/blog/blogs", "GET");
        setBlogs(data);
        setFilteredBlogs(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs((prev) => {
        const filteredBlogs = blogs.filter(
          (blog) => blog.category.toLowerCase() === activeCategory.toLowerCase()
        );

        // Sort the filteredBlogs array by createdAt in descending order
        const sortedBlogs = [...filteredBlogs].sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });

        return sortedBlogs;
      });
    }
  }, [activeCategory, blogs]);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchCriteriaChange = (event) => {
    setSelectedSearchCriteria(event.target.value);
  };

  // Function to truncate text to a specified number of words
  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length <= maxWords) {
      return text;
    }
    return words.slice(0, maxWords).join(" ") + "...";
  };

  return (
    <div className={classes.container}>
      <br/>      <br/>
      <br/>

      <div className={classes.wrapper}>
        <div className={classes.header}>
          <h3>Explore the DestiGo Community</h3>
          <div className={classes.plusCircleContainer}>
            <span className={classes.createPostText}>Create a post</span>
            <Link to="/create">
              <AiFillPlusCircle className={classes.plusCircle} />
            </Link>
          </div>
        </div>

        <div className={classes.BlogListSearch}>
          <AiOutlineSearch className={classes.SearchIconBlog} />

          <select
            className={classes.BlogSearchDropdown}
            onChange={handleSearchCriteriaChange}
            value={selectedSearchCriteria}
          >
            <option value="title">Search by Title</option>
            <option value="description">Search by Content</option>
            <option value="username">Search by Author</option>
          </select>
          <input
            className={classes.BlogSearchBar}
            type="text"
            id="search"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </div>
        <h5>Select a Category below to filter.</h5>

        <div className={classes.categoriesAndBlogs}>
          <div className={classes.categories}>
            {categories.map((category) => (
              <span
                key={category}
                className={`${classes.category} ${
                  activeCategory === category && classes.active
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </span>
            ))}
          </div>
          {filteredBlogs?.length > 0 ? (
            <div className={classes.blogs}>
              {filteredBlogs
                .filter((blog) => {
                  const lowerSearchInput = searchInput.toLowerCase();
                  switch (selectedSearchCriteria) {
                    case "username":
                      return blog.userId.username
                        .toLowerCase()
                        .includes(lowerSearchInput);
                    case "description":
                      return blog.desc.toLowerCase().includes(lowerSearchInput);
                    default:
                      // Default to searching by title
                      return blog.title
                        .toLowerCase()
                        .includes(lowerSearchInput);
                  }
                })
                .map((blog) => (
                  <div key={blog._id} className={classes.blog}>
                    <Link to={`/blogDetails/${blog._id}`}>
                      <img src={`${blog?.photo}`} alt={blog?.title} />
                    </Link>
                    <div className={classes.blogData}>
                      <div className={classes.categoryAndMetadata}>
                        <span className={classes.category}>
                          {blog?.category}
                        </span>

                        <div className={classes.metadata}>
                          <MdOutlinePreview /> {blog.views} views
                        </div>
                        <div className={classes.metadata}>
                          <AiFillLike /> {blog?.likes?.length} likes
                        </div>
                        
                          
                        {blog.featured && (
                            <span className={classes.featuredText}>
                              <AiFillStar/> Featured
                            </span>
                          )}
                     
                      </div>
                      <h4>{blog?.title}</h4>
                      <p className={classes.blogDesc}>
                        {truncateText(blog?.desc, 70)}
                      </p>
                      <div className={classes.authorAndCreatedAt}>
                        <div className={classes.userInfo}>
                          <img
                            src={blog?.userId?.profilePicture}
                            alt={blog?.userId?.username}
                          />
                          <p>{blog?.userId?.username}</p>
                        </div>
                        <span className={classes.createdAt}>
                          <AiFillClockCircle /> {format(blog?.createdAt)}
                        </span>
                      </div>
                      <Link
                        to={`/blogDetails/${blog._id}`}
                        className={classes.readMore}
                      >
                        Read More <FiArrowRight />
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <h3 className={classes.noBlogsMessage}>
              😔 No posts for this category yet!
            </h3>
          )}
        </div>
      </div>
      <div className={classes.Spacer}></div>
    </div>
  );
};

export default Categories;
