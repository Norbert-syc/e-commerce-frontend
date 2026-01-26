import Header from "../components/header/Header";
import MainHeader from "../components/header/MainHeader";
import NavBar from "../components/header/NavBar";
import TopBar from "../components/header/TopBar";
import Shop from "../components/Shop";

const ShopPage = () => {
  return (
    <>
      <TopBar />
      <Header />
      <MainHeader />
      <NavBar />
      <div className="main-content">
        <Shop />
      </div>
    </>
  );
};

export default ShopPage;
