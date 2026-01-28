import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./SliderSection.css";

const SliderSection = () => {
  const settings = {
    dots: false,           // Hide dots
    arrows: false,         // Hide arrows
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,        // Auto slide
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className="slider-section">
      <Slider {...settings}>
        <div className="slide">
          <img src="/icons/slider1.jpg" alt="Slide 1" />
        </div>
        <div className="slide">
          <img src="/icons/slider2.jpg" alt="Slide 2" />
        </div>
        <div className="slide">
          <img src="/icons/slider3.jpg" alt="Slide 3" />
        </div>
    
      </Slider>
    </section>
  );
};

export default SliderSection;
