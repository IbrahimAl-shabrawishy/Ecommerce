import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout/Layout";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Register from "./components/Register/Register";
import Brands from "./components/Brands/Brands";
import Notfounded from "./components/Notfounded/Notfounded";
import ContextUserProvider from "./context/contextUser";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CartContextProvider from "./context/CartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Payment from "./components/Payment/Payment";

function App() {
  const queryClient = new QueryClient();

  let router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "Cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "Payment/:cartId",
          element: (
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          ),
        },

        { path: "Login", element: <Login /> },
        { path: "Logout", element: <Logout /> },
        { path: "Register", element: <Register /> },
        {
          path: "Brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "ProductDetails/:id/:category",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },

        { path: "*", element: <Notfounded /> },
      ],
    },
  ]);

  return (
    <CartContextProvider>
      <ContextUserProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools></ReactQueryDevtools>
          <RouterProvider router={router} />
          <Toaster />
        </QueryClientProvider>
      </ContextUserProvider>
    </CartContextProvider>
  );
}

export default App;
