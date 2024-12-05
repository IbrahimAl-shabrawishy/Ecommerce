import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useContext, useState } from "react";
import { userContext } from "../../context/contextUser";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import animationData from "../../assets/animation/Animation - 1733262811324.json";
import { Helmet } from "react-helmet";
import styles from "./Register.module.css";
export default function Register() {
  const { setIsRegister } = useContext(userContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleRegister(formData) {
    setLoading(true);
    try {
      console.log("register", formData);
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        setIsRegister(data.token);
        toast.success("Registration Successful");
        navigate("/login");
        console.log(data);
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        `Error: ${error.response ? error.response.data.message : error.message}`
      );
    }
  }

  let validateRegister = Yup.object({
    name: Yup.string()
      .required("name is Required")
      .min(3, "min length is 3")
      .max(20, "max length is 20"),
    email: Yup.string().required("email is Required").email("email is invalid"),
    password: Yup.string()
      .required("Password is Required")
      .matches(
        /^[A-Z][a-zA-Z0-9]{7,15}$/,
        "Password must start with capital letter and must be 8-15 characters long"
      ),
    rePassword: Yup.string()
      .required("Confirm Password is Required")
      .oneOf([Yup.ref("password")]),
    phone: Yup.string()
      .required("phone is Required")
      .matches(/^01[0125]\d{8}$/, "phone number is invalid"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validateRegister,
    onSubmit: handleRegister,
  });

  return (
    <div>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <div className={`${styles.lottie}`}>
        <div className="w-48 ">
          <Lottie animationData={animationData} loop={true} />
        </div>
      </div>
      <div className=" flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="bg-white shadow-md rounded-md p-6">
            <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-black">
              Sign up
            </h2>

            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-black"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    name="name"
                    id="name"
                    type="text"
                    required
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  />
                  {formik.errors.name && formik.touched.name ? (
                    <div className="bg-slate-400 p-2 rounded-md text-white">
                      {formik.errors.name}
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    name="email"
                    type="email"
                    id="email"
                    autoComplete="off"
                    required
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <div className="bg-slate-400 p-2 rounded-md text-white">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    name="password"
                    type="password"
                    autoComplete="off"
                    id="password"
                    required
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <div className="bg-slate-400 p-2 rounded-md text-white">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <label
                  htmlFor="rePassword"
                  className="block text-sm font-medium text-black"
                >
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.rePassword}
                    name="rePassword"
                    type="password"
                    id="rePassword"
                    autoComplete="off"
                    required
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  />
                  {formik.errors.rePassword && formik.touched.rePassword ? (
                    <div className="bg-slate-400 p-2 rounded-md text-white">
                      {formik.errors.rePassword}
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-black"
                >
                  Phone
                </label>
                <div className="mt-1">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    name="phone"
                    type="tel"
                    autoComplete="off"
                    id="phone"
                    required
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  />
                  {formik.errors.phone && formik.touched.phone ? (
                    <div className="bg-slate-400 p-2 rounded-md text-white">
                      {formik.errors.phone}
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={!formik.isValid || loading}
                  className="flex w-full justify-center rounded-md border border-black py-2 px-4 text-sm font-medium text-black shadow-sm focus:outline-none hover:bg-slate-300 focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
                >
                  {loading ? "Registering..." : "Register Account"}{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
