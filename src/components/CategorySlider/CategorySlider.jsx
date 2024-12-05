import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import styles from "./CategorySlider.module.css";
export default function CategorySlider() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(response.data.data);
    } catch (error) {
      alert("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1025 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="category-slider">
      <h1 className="text-black text-center  p-11 font-extrabold shadow bg-white ">
        Shop Popular Category
      </h1>
      {categories.length > 0 ? (
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          keyBoardControl={true}
          customTransition="all 0.5s ease"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {categories.map((category) => (
            <div key={category._id} className="category-item">
              <img
                src={category.image}
                alt={category.name}
                className={`${styles.CategoryImage}`}
              />
              <h4 className="category-name text-center m-5 text-black">
                {category.name}
              </h4>
            </div>
          ))}
        </Carousel>
      ) : (
        <p>Loading categories...</p>
      )}
    </div>
  );
}
