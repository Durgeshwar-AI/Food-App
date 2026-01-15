import Cards from "../Components/Home/Cards";
import Footer from "../Components/Footer";
import Hero from "../Components/Home/Hero";
import Navbar from "../Components/Navbar";
import Stats from "../Components/Home/Stats";
import Features from "../Components/Home/Features";
import Categories from "../Components/Home/Categories";
import HowItWorks from "../Components/Home/HowItWorks";
import PopularFoods from "../Components/Home/PopularFoods";
import Testimonials from "../Components/Home/Testimonials";
import Newsletter from "../Components/Home/Newsletter";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="mt-16">
        <Hero />
        <Stats />
        <Cards />
        <Categories />
        <HowItWorks />
        <Features />
        <PopularFoods />
        <Testimonials />
        <Newsletter />
      </div>
      <Footer />
    </>
  );
};

export default Home;
