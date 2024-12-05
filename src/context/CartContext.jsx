// Importing required modules and libraries
import { createContext, useState } from "react"; // React's context API for managing global state
import axios from "axios"; // HTTP client for making API requests

// Creating a context named 'cartContext' to hold and share cart-related functionality across components
export let cartContext = createContext();

// React component to provide the context to its children
// This component wraps any components that need access to 'cartContext'
export default function CartContextProvider(props) {
  const [cartNumber, setCartNumber] = useState(0);

  //A utility function to generate headers for API requests, including a token from localStorage
  function getHeaders() {
    return {
      token: localStorage.getItem("userToken"), // Retrieve the user's token from local storage
    };
  }

  // Asynchronous function to add a product to the cart
  // Accepts the product ID as an argument and makes a POST request to the API
  async function addProductToCart(productId) {
    try {
      // Sending a POST request to the 'add to cart' endpoint with productId and headers
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`, // API endpoint for adding a product to the cart
        { productId: productId }, // Request body containing the product ID
        {
          headers: getHeaders(), // Custom headers, including the user token
        }
      );
      setCartNumber(response.data.numOfCartItems);
      return response; // Returning the successful response
    } catch (error) {
      // Handling errors and returning either the response error or the error object
      return error.response || error;
    }
  }

  async function getProductToCart() {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: getHeaders(),
        }
      );
      setCartNumber(response.data.numOfCartItems);
      return response;
    } catch (error) {
      return error.response || error;
    }
  }

  async function updateProductInCart(productId, count) {
    try {
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: count,
        },
        {
          headers: getHeaders(),
        }
      );
      return response;
    } catch (error) {
      return error.response || error;
    }
  }

  //Remove
  async function removeProductInCart(productId) {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers: getHeaders(),
        }
      );
      setCartNumber(response.data.numOfCartItems);
      return response;
    } catch (error) {
      return error.response || error;
    }
  }

  return (
    // Providing the 'addProductToCart' function as part of the context value
    <cartContext.Provider
      value={{
        addProductToCart,
        getProductToCart,
        updateProductInCart,
        removeProductInCart,
        cartNumber,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
