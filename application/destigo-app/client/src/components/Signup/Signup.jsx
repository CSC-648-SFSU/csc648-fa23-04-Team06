import {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

const Signup = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const url = "http://localhost:8080/api/users";
            const {data: res} = await axios.post(url, data);
            navigate('/login');
        } catch (error){
            error.response
        }
    }

    return (
        <div>
            <h1>Welcome Back</h1>
            <Link to="/login">
                <button type="button">
                    Sign in
                </button>
            </Link>
        
        <form onSubmit={handleSubmit}>

        </form>
        </div>
    );

}

export default Signup;