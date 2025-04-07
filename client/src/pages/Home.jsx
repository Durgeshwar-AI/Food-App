import Cards from "../Components/Cards";
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
    </>
  );
};

export default Home;
