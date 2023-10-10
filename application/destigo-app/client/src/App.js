import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/index"
import Signup from "./pages/signup"


export default function App(){
  return(
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}