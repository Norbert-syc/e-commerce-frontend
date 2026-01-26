import "./Hero.css";
import HeroSlider from "./HeroSlider";
import PromoCards from "./PromoCards";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-inner">
        <HeroSlider />
        <PromoCards />
      </div>
    </section>
  );
};

export default Hero;
