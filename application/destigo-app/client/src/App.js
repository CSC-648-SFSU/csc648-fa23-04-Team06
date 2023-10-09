import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from './pages/index'

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
      
    </div>
  );
}

export default App;