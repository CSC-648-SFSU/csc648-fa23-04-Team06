import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home/Home';
import Blog from './pages/blog/Blog';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Create from './pages/create/Create';
import BlogDetails from './pages/blogDetails/BlogDetails';
import UpdateBlog from './pages/updateBlog/UpdateBlog';
import Hotels from './pages/hotels/hotels';
import Flights from './pages/flights/flights';
import Events from './pages/events/events';
import About from './pages/about/about';

import { useSelector } from 'react-redux';

function App() {
  const { user } = useSelector((state) => state.auth)

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}> </Route>
        <Route path="/about" element={<About/>}> </Route>
        <Route path="/hotels" element={<Hotels/>}> </Route>
        <Route path="/flights" element={<Flights/>}> </Route>
        <Route path="/events" element={<Events/>}> </Route>
        <Route path='/blog' element={user ? <Blog /> : <Navigate to='/login' />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path='/register' element={!user ? <Register /> : <Navigate to='/' />} />
        <Route path='/create' element={user ? <Create /> : <Navigate to='/login' />} />
        <Route path='/blogDetails/:id' element={user ? <BlogDetails /> : <Navigate to='/login' />} />
        <Route path='/updateBlog/:id' element={user ? <UpdateBlog /> : <Navigate to='/login' />} />
      </Routes>
    </div>
  );
}

export default App;
