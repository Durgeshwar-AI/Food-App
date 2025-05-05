import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import ContactPage from "./pages/ContactPage"

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
      </Routes>
  )
}

export default App