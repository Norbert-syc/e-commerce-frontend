import { useState, useEffect } from "react";

const HeroSlider = () => {
  const slides = [
    {
      image:
        "https://images.ctfassets.net/prxuf37q3ta2/1HF5LkdNnuoEAUN5I9rbO8/7ecc95401e2cd784946156ba221cf802/Regular-Fit-Stretch-Chinos.jpg?w=2560&fm=webp",
      title: "Fashion Accessories",
      subtitle: "Festive Feast",
      discount: "Minimum 50% Off",
    },
    {
      image:
        "https://fashionisers.com/wp-content/uploads/2020/04/2020-mens-fashion-trends.jpg",
      title: "Winter Collection",
      subtitle: "New Arrivals",
      discount: "Up to 40% Off",
    },
    {
      image:
        "https://hips.hearstapps.com/hmg-prod/images/gettyimages-1932472664-65a5839d619cd.jpg?crop=1.00xw:0.668xh;0,0&resize=1120:*",
      title: "Summer Sale",
      subtitle: "Fresh Style",
      discount: "Minimum 60% Off",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="slider">
      <img src={slides[currentSlide].image} alt={slides[currentSlide].title} />
      <div className="slider-content">
        <h4>{slides[currentSlide].subtitle}</h4>
        <h1>{slides[currentSlide].title}</h1>
        <p>{slides[currentSlide].discount}</p>
        <button>Shop Now</button>
      </div>

      <button className="slider-btn prev" onClick={prevSlide}>
        ❮
      </button>
      <button className="slider-btn next" onClick={nextSlide}>
        ❯
      </button>

      <div className="slider-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
