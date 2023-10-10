import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/index"


export default function App(){
  return(
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="/home" element={<HomePage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}