import axios from "axios";
import { useContext } from "react";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import CategorySlider from "../CategorySlider/CategorySlider";
import { cartContext } from "../../context/CartContext";
import Lottie from "lottie-react";
import animationData from "../../assets/animation/Animation - 1733260819394.json";
import MainSlider from "../MainSlider/MainSlider";
import styles from "./Products.module.css";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

export default function Products() {
  const { addProductToCart } = useContext(cartContext);

  async function getProduct() {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    return response.data.data;
  }

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["recentProduct"],
    queryFn: getProduct,
    refetchInterval: 20000,
    staleTime: 4000,
  });

  async function addProductItem(id) {
    try {
      let response = await addProductToCart(id);
      if (response.data.status === "success") {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("An error occurred while adding the product to the cart.");
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    toast.error(`Error: ${error.message}`);
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={`${styles.products}`}>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <MainSlider />
      <CategorySlider />

      <h1 className="text-black text-center  p-11 font-extrabold shadow bg-white ">
        All Products
      </h1>

      <div className={`${styles.lottie}`}>
        <div className="w-48 ">
          <Lottie animationData={animationData} loop={true} />
        </div>
      </div>
      <div className={`row container`}>
        {products?.map((productItem) => (
          <div
            key={productItem.id}
            className={`relative m-10 flex w-full max-w-xs flex-col overflow-hidden card rounded-lg border hover:border-black ${styles.card} shadow-md`}
          >
            <Link
              to={`/ProductDetails/${productItem.id}/${productItem?.category?.name}`}
              className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
            >
              <img
                className={`object-cover w-full ${styles.images}`}
                src={productItem.imageCover || "/path-to-placeholder.jpg"}
                alt={productItem.title || "No title available"}
              />
              <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                39% OFF
              </span>
            </Link>
            <div className="text-center text-black  p-7">
              <h3>{productItem?.category?.name || "No category"}</h3>
              <h2>
                {productItem?.title?.split(" ").slice(0, 3).join(" ") ||
                  "No title"}
              </h2>
              <div className="flex justify-between text-sm">
                <span>
                  {productItem?.price
                    ? `${productItem.price} EGP`
                    : "No price available"}
                </span>
                <span>
                  {productItem?.ratingsQuantity}{" "}
                  <i className="fas fa-star text-yellow-500"></i>
                </span>
              </div>
              <button
                onClick={() => addProductItem(productItem.id)}
                className="flex items-center justify-center rounded-xl border-black border  px-5 py-2.5 mt-6 text-center text-sm font-medium text-black hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-black "
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
          </div>
        ))}
      </div>
    </div>
  );
}
