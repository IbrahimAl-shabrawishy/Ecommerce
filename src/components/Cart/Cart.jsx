import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../context/CartContext";
import Loading from "../Loading/Loading";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../assets/animation/Animation - 1733265843085.json";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const { getProductToCart, updateProductInCart, removeProductInCart } =
    useContext(cartContext);
  const [isLoading, setLoading] = useState(true);

  // Fetch products from cart
  async function getProducts() {
    try {
      const { data } = await getProductToCart();
      if (data && data.data && data.data.products) {
        setProducts(data.data.products);
      } else {
        console.error("No products found in the cart");
      }
    } catch (error) {
      console.error("Error fetching cart products:", error);
    } finally {
      setLoading(false);
    }
  }

  // Update product quantity
  async function updateProductQuantity(productId, newCount) {
    try {
      if (newCount > 0) {
        const { data } = await updateProductInCart(productId, newCount);
        if (data && data.data && data.data.products) {
          setProducts(data.data.products);
        }
      }
    } catch (error) {
      console.error("Error updating product quantity:", error);
    }
  }

  // Remove product from cart
  async function removeProduct(productId) {
    try {
      const { data } = await removeProductInCart(productId);
      if (data && data.data && data.data.products) {
        setProducts(data.data.products);
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="px-4 py-6">
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <h1 className="text-black text-center p-11 font-extrabold shadow bg-white">
        Products in Cart
      </h1>

      {!isLoading ? (
        products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 border mt-3">
            {products.map((item) => (
              <div
                key={item.product.id}
                className="p-5 m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border hover:border-black shadow-md"
              >
                <img
                  src={item.product.imageCover}
                  alt={item.product.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="font-semibold text-lg text-black mb-2">
                  {item.product.title}
                </h2>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-black">{item.price}$</span>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() =>
                        updateProductQuantity(item.product.id, item.count - 1)
                      }
                      className="px-2 py-1 text-black bg-white rounded-full border border-black"
                    >
                      -
                    </button>
                    <span className="text-black">{item.count}</span>
                    <button
                      onClick={() =>
                        updateProductQuantity(item.product.id, item.count + 1)
                      }
                      className="px-2 py-1 text-black bg-white rounded-full border border-black"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeProduct(item.product.id)}
                  className="w-48 m-2 py-2 text-center text-black bg-white border border-black rounded-lg hover:bg-slate-200"
                >
                  Remove
                </button>
                <Link to={`/Payment/${item.product._id}`}>
                  <button
                    type="button"
                    className="w-48 m-2 py-2 text-center text-black bg-white border border-black rounded-lg hover:bg-slate-200"
                  >
                    Buy now
                  </button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <Lottie
              animationData={animationData}
              loop={true}
              className="w-48"
            />
          </div>
        )
      ) : (
        <Loading />
      )}
    </div>
  );
}
