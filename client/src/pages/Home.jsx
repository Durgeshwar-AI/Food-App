import Cards from "../Components/Home/Cards";
import Footer from "../Components/Footer";
import Hero from "../Components/Home/Hero";
import Navbar from "../Components/Navbar";
import Offers from "../Components/Home/Offers";
import PopularFoods from "../Components/PopularFoods";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Cards />
      <Offers />
      <PopularFoods/>
      <Footer/>
    </>
  );
};

export default Home;
