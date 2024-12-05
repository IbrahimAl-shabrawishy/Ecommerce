import React from "react";
import Slider from "react-slick";
import img1 from "../../assets/images/slider-image-1.jpeg";
import img2 from "../../assets/images/slider-image-2.jpeg";
import img3 from "../../assets/images/banner-25.jpg";
import img4 from "../../assets/images/banner-15.jpg";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Slider Section */}
        <div className="md:w-2/3 w-full">
          <Slider {...settings}>
            <img
              src={img3}
              alt="img1"
              className="w-full h-[200px] md:h-[400px] object-cover"
            />
            <img
              src={img4}
              alt="img2"
              className="w-full h-[200px] md:h-[400px] object-cover"
            />
          </Slider>
        </div>

        {/* Images Section */}
        <div className="md:w-1/3 w-full flex flex-col gap-4">
          <img
            src={img1}
            alt="img1"
            className="w-full h-[100px] md:h-[200px] object-cover"
          />
          <img
            src={img2}
            alt="img2"
            className="w-full h-[100px] md:h-[200px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}
