import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Slider from "react-slick";
import Category from "../Category/Category";
import { cartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../Loading/Loading";

export default function ProductDetails() {
  let { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  let { addProductToCart } = useContext(cartContext);
  const [isLoading, setIsLoading] = useState(true);

  // Add product to cart function
  async function addProductItem(id) {
    let response = await addProductToCart(id);
    if (response.data.status === "success") {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    setIsLoading(false);
  }

  // Fetch product details based on the id
  async function getProductDetails() {
    try {
      let response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProductDetails(response.data.data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error loading product details");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);

  const Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <>
      {!isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl">
            {productDetails && (
              <>
                <Slider {...Settings}>
                  {productDetails.images?.map((src, index) => (
                    <div key={index}>
                      <img
                        className="w-72 h-64 mx-auto object-cover"
                        src={src}
                        alt={productDetails?.title}
                      />
                    </div>
                  ))}
                </Slider>
                <div className="p-11">
                  <h1 className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    {productDetails?.title}
                  </h1>
                  <p className="mt-2 text-slate-500">
                    {productDetails?.description}
                  </p>
                  <p>{productDetails?.category?.name}</p>
                  <div className="flex justify-between pt-10 text-sm">
                    <span>{productDetails?.price} EGP</span>
                    <span>
                      {productDetails?.ratingsQuantity}{" "}
                      <i className="fas fa-star text-yellow-500"></i>
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      addProductItem(productDetails?.id);
                    }}
                    className="flex items-center justify-center rounded-md bg-blue-700 px-5 py-2.5 mt-6 text-center text-sm font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Add to cart
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          <Loading />
        </>
      )}
      {productDetails && (
        <Category categoryName={productDetails.category?.name} />
      )}
    </>
  );
}
