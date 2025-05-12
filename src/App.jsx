import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HoroscopePage from "./pages/HoroscopePage"
import "./styles/App.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HoroscopePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
