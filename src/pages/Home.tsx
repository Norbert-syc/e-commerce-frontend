import Header from "../components/header/Header";
import MainHeader from "../components/header/MainHeader";
import NavBar from "../components/header/NavBar";
import Hero from "../components/hero/Hero";
import CategoryList from "../components/categoryList";
import FeaturedProducts from "../components/productList";
import TopBar from "../components/header/TopBar";

const Home = () => {
  return (
    <>
      <TopBar />
      <Header />
      <MainHeader />
      <NavBar />
      <Hero />
      <CategoryList />
      <FeaturedProducts />
    </>
  );
};

export default Home;
