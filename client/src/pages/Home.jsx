import Cards from "../Components/Cards";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import Offers from "../Components/Offers";
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
