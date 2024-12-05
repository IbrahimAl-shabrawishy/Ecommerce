import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function Category({ categoryName }) {
  const [productCategory, setProductCategory] = useState([]);
  const [isLoading, setLoading] = useState(true);

  // Fetch products based on the category
  async function getProductCategory() {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      const filteredProducts = response.data.data.filter(
        (item) => item.category.name === categoryName
      );
      setProductCategory(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (categoryName) {
      getProductCategory();
    }
  }, [categoryName]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : productCategory.length > 0 ? (
        <div className="row container">
          {productCategory.map((productItem) => (
            <div
              key={productItem.id}
              className="m-10 flex w-full max-w-xs flex-col rounded-lg border bg-white shadow-md"
            >
              <Link
                to={`/ProductDetails/${productItem.id}/${productItem.category.name}`}
                className="flex h-60 overflow-hidden rounded-xl"
              >
                <img
                  className="object-cover w-full"
                  src={productItem.imageCover || "placeholder.jpg"}
                  alt={productItem.title || "No title"}
                />
              </Link>
              <div className="p-5 text-center">
                <h3>{productItem.category.name}</h3>
                <h2>{productItem.title.split(" ").slice(0, 3).join(" ")}</h2>
                <div className="flex justify-between text-sm">
                  <span>{productItem.price} EGP</span>
                  <span>
                    {productItem.ratingsQuantity}{" "}
                    <i className="fas fa-star text-yellow-500"></i>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found for this category.</p>
      )}
    </>
  );
}
