import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'

function App() {
    return (
        <BrowserRouter>
            <div> 
                <Routes>
                    <Route path="/Signup" exact element={<Signup />} />
                    <Route path="/Login" exact element={<Login />} />
                    <Route path="/Home" exact element={<Home />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
