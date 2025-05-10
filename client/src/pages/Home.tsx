import Cards from "../Components/Home/Cards";
import Footer from "../Components/Footer";
import Hero from "../Components/Home/Hero";
import Navbar from "../Components/Navbar";
import Offers from "../Components/Home/Offers";
import PopularFoods from "../Components/Home/PopularFoods";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="mt-16">
        <Hero />
        <Cards />
        <Offers />
        <PopularFoods/>
      </div>
      <Footer/>
    </>
  );
};

export default Home;
