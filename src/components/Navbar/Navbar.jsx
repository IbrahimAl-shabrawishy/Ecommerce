import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../../context/contextUser";
import { cartContext } from "../../context/CartContext";
import logo from "../../assets/images/freshcart-logo.svg";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLogin, isRegister, setIsLogin, setIsRegister } =
    useContext(userContext);
  const { cartNumber, getProductToCart } = useContext(cartContext);
  const navigate = useNavigate();

  // Fetch cart products on component mount
  useEffect(() => {
    if (getProductToCart) {
      getProductToCart();
    }
  }, [getProductToCart]);

  // Logout handler
  function Logout() {
    localStorage.removeItem("userToken");
    setIsLogin(null);
    setIsRegister(null);
    navigate("/Login");
  }

  return (
    <header className="lg:px-16 px-4 bg-slate-200 flex flex-wrap items-center py-4 shadow-md">
      <div className="flex-1 flex justify-between items-center">
        <img className="text-xl text-white" src={logo} alt="Logo" />
      </div>

      <button
        className="pointer-cursor md:hidden block text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          className="fill-current text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>

      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:flex md:items-center md:w-auto w-full`}
      >
        <nav className="md:flex">
          {!isLogin || !isRegister ? (
            <ul className="md:flex items-center text-base text-black font-medium pt-4 md:pt-0">
              <li>
                <NavLink to={"/Register"} className="md:p-4 py-3 px-0 block">
                  Register
                </NavLink>
              </li>

              <li>
                <NavLink to={"/Login"} className="md:p-4 py-3 px-0 block">
                  Login
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul className="md:flex items-center text-base text-black font-medium">
              <li>
                <NavLink to={"/"} className="md:p-4 py-3 px-0 block">
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink to={"/Brands"} className="md:p-4 py-3 px-0 block">
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink to={"/Cart"} className="md:p-4 py-3 px-0 block">
                  Cart{" "}
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {cartNumber || 0}
                  </span>
                </NavLink>
              </li>

              <li>
                <span
                  onClick={Logout}
                  className="md:p-4 py-3 px-0 block cursor-pointer"
                >
                  Logout
                </span>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}
