import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/navbar/navbar.js';
import "../styles/signup.css";

const Signup = () => {
    const [signupData, setSignupData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = ({ target: { name, value } }) => {
        setSignupData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:3000/signup";
            const { data: res } = await axios.post(url, signupData);

            console.log(res.message);

            if (res.success) {
                navigate("/login");
            } else {
                console.error("Sign up failed:", res.message);
            }
        } catch (error) {
            console.error("Sign up error:", error);
        }
    };

    return (
        <div>
      <Navbar />
        <div className="form">
            <div className="title">Create Account</div>
            <form onSubmit={handleSubmit}>
                <div className="input-container ic1">
                    <input 
                        id="firstname" 
                        className="input" 
                        type="text"
                        name="firstName"
                        value={signupData.firstName}
                        onChange={handleChange}
                        placeholder=" " 
                    />
                    <div className="cut"></div>
                    <label htmlFor="firstname" className="placeholder">First name</label>
                </div>
                <div className="input-container ic2">
                    <input 
                        id="lastname" 
                        className="input" 
                        type="text"
                        name="lastName"
                        value={signupData.lastName}
                        onChange={handleChange}
                        placeholder=" " 
                    />
                    <div className="cut"></div>
                    <label htmlFor="lastname" className="placeholder">Last name</label>
                </div>
                <div className="input-container ic1">
                    <input 
                        id="username" 
                        className="input" 
                        type="text"
                        name="username"
                        value={signupData.username}
                        onChange={handleChange}
                        placeholder=" " 
                    />
                    <div className="cut"></div>
                    <label htmlFor="username" className="placeholder">Username</label>
                </div>
                <div className="input-container ic2">
                    <input 
                        id="email" 
                        className="input" 
                        type="email"
                        name="email"
                        value={signupData.email}
                        onChange={handleChange}
                        placeholder=" " 
                    />
                    <div className="cut cut-short"></div>
                    <label htmlFor="email" className="placeholder">Email</label>
                </div>
                <div className="input-container ic1">
                    <input 
                        id="password" 
                        className="input" 
                        type="password"
                        name="password"
                        value={signupData.password}
                        onChange={handleChange}
                        placeholder=" " 
                    />
                    <div className="cut"></div>
                    <label htmlFor="password" className="placeholder">Password</label>
                </div>
                <button type="submit" className="submit">Submit</button>
            </form>
        </div>
        </div>
    );
}

export default Signup;
