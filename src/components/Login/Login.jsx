import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useContext } from "react";
import { userContext } from "../../context/contextUser";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
export default function Login() {
  let { setIsLogin } = useContext(userContext);
  const navigate = useNavigate();

  async function handleRegister(formData) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.message == "success") {
        localStorage.getItem("userToken", data.token);
        setIsLogin(data.token);
        toast.success("Login Successful");
        navigate("/");
      }
    } catch (error) {
      toast.error(" Error:Login UnSuccessful "), error.message;
    }
  }

  let validateLogin = Yup.object({
    email: Yup.string().required("email is Required").email("email is invalid"),
    password: Yup.string()
      .required("Password is Required")
      .matches(
        /^[A-Z][a-zA-Z0-9]{7,15}$/,
        "Password must start with capital letter and must be 8-15 characters long"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateLogin,
    onSubmit: handleRegister,
  });

  return (
    <div>
      <Helmet>
        <title>LogIn</title>
      </Helmet>
      <div className=" flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="bg-white border hover:border-black shadow-md rounded-md p-6">
            <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-black">
              Sign In
            </h2>

            <form className="space-y-6 " onSubmit={formik.handleSubmit}>
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
                    <div className="bg-slate-400 p-2 rounded-md text-white ">
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
                    <div className="bg-slate-400 p-2 rounded-md text-white ">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <button
                  disabled={!formik.isValid}
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-black py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
                >
                  Login Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
