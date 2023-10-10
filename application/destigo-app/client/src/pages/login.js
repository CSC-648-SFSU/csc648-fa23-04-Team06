import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/navbar/navbar.js';
import "../styles/signup.css"; 

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = ({ target: { name, value } }) => {
        setLoginData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:3000/login";  
            const { data: res } = await axios.post(url, loginData);

            console.log(res.message);

            if (res.success) {
                // check if user is a new signup
                if (document.referrer.includes("/signup")){
                    navigate("/home");
                // go back to previous page
                } else {
                navigate(-1);
                }   
            } else {
                console.error("Login failed:", res.message);
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const goToSignup = () => {
        navigate("/signup");
    };

    return (
        <div>
            <Navbar />
            <div className="form login">
                <div className="title">Login</div>
                <form onSubmit={handleSubmit}>
                    <div className="input-container ic2">
                        <input 
                            id="email" 
                            className="input" 
                            type="email"
                            name="email"
                            value={loginData.email}
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
                            value={loginData.password}
                            onChange={handleChange}
                            placeholder=" " 
                        />
                        <div className="cut"></div>
                        <label htmlFor="password" className="placeholder">Password</label>
                    </div>
                    <button type="submit" className="submit">Login</button>
                </form>
                <div className="subtitle">Don't have an account?</div>
                <button type="submit" className="submit" onClick={goToSignup}>Create Account</button>

            </div>
        </div>
    );
}

export default Login;
