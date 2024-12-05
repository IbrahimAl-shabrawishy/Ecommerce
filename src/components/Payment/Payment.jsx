import axios from "axios";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Payment() {
  let { cartId } = useParams();
  console.log("Cart ID:", cartId);

  async function registerHandle(formsData) {
    console.log("Form Data Sent:", formsData);
    const userToken = localStorage.getItem("userToken");
    console.log("User Token:", userToken);

    if (!userToken) {
      alert("User not authenticated. Please log in and try again.");
      return;
    }

    try {
      let response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        {
          shippingAddress: formsData,
        },
        {
          headers: {
            token: userToken,
          },
          params: {
            url: "http://localhost:5173/",
          },
        }
      );

      alert("Payment information submitted successfully!");
      return response;
    } catch (error) {
      console.error("Error Response:", error.response?.data);
      console.error("Error Message:", error.message);

      if (error.response?.data.message.includes("no cart")) {
        alert(
          "No cart found for this user. Please add items to your cart and try again."
        );
      } else {
        alert("Error submitting payment information. Please try again.");
      }
    }
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    onSubmit: registerHandle,
  });
  console.log("Formik Values:", formik.values);

  return (
    <div>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <h1 className="text-black text-center  p-11 font-extrabold shadow bg-white ">
        Payment Now....
      </h1>
      <div className="w-full max-w-lg mx-auto p-8 ">
        <div className="bg-white rounded-lg shadow-lg p-6 border hover:border-black">
          <h2 className="text-lg font-medium mb-6">Payment Information</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="details"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Details
                </label>
                <input
                  type="text"
                  name="details"
                  id="details"
                  value={formik.values.details}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Details"
                  className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  City
                </label>
                <input
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  name="city"
                  id="city"
                  placeholder="City"
                  className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone
                </label>
                <input
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                  className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="mt-8">
              <button className="w-full border border-black hover:bg-slate-300 text-black font-medium py-3 rounded-lg focus:outline-none">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
