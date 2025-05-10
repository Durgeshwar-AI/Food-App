import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import ContactPage from "./pages/ContactPage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import OurChefs from "./Components/OurChefs"

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/chefs" element={<OurChefs/>}/>
      </Routes>
  )
}

export default App