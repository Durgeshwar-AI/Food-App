import Category from "./Components/Category"
import Food from "./Components/Food"
import HeadCards from "./Components/HeadCards"
import Hero from "./Components/Hero"
import Navbar from "./Components/Navbar"

const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <HeadCards/>
      <Food/>
      <Category/>
    </div>
  )
}

export default App