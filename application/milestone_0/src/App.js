import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/index"
import PageSahej from "./pages/sahej"
import PageFaheemah from "./pages/faheemah"
import PageJessica from "./pages/jessica"
import PageNavjot from "./pages/navjot"
import PageRay from "./pages/ray"
import PageRyan from "./pages/ryan"
import NoPage from "./pages/404"


export default function App(){
  return(
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/sahej" element={<PageSahej/>}/>
        <Route path="/faheemah" element={<PageFaheemah/>}/>
        <Route path="/jessica" element={<PageJessica/>}/>
        <Route path="/navjot" element={<PageNavjot/>}/>
        <Route path="/ray" element={<PageRay/>}/>
        <Route path="/ryan" element={<PageRyan/>}/>
        <Route path="*" element={<NoPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}