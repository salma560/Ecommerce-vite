import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { object, ref, string } from "yup";
import { UserContext } from "../../context/User.context";

export default function Login() {
 const{token,setToken}= useContext(UserContext)
  const navigate = useNavigate();
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const [data, setdata] = useState(null);
  const validationSchema = object({
    email: string().email("email is invalid").required("please enter email"),
    password: string()
      .required("please enter password")
      .matches(
        passwordRegex,
        "password should be Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
  });

  async function onSubmit(values) {
    const toastid = toast.loading("Wait..");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      setdata(data);
      if (data.message == "success") {
        navigate("/");
        setToken(data.token)
        localStorage.setItem("token",data.token)
      }
      console.log(data);

      toast.update(toastid, {
        render: "Logged in Successfully",
        type: "success",
        isLoading: false,
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: false,
      });
    } catch (error) {
      console.log(error);
      toast.update(toastid, {
        render: error.response.data.message || "Try Again!!",
        type: "error",
        isLoading: false,
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema,
  });
  return (
    <>
      <h1 className="font-bold text-slate-500 text-xl">
        <i className="fa-solid fa-user text-myColor-500"></i> LogIn
      </h1>
      <form className="form py-5 space-y-5" onSubmit={formik.handleSubmit}>
        <div className="emailInput">
          <input
            type="email"
            className="form-control w-full"
            placeholder="Type your Email..."
            name="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-600 text-sm mt-1">
              {formik.errors.email}
            </div>
          )}
        </div>
        <div className="passwordInput">
          <input
            type="password"
            className="form-control w-full"
            placeholder="enter password..."
            name="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-600 text-sm mt-1">
              {formik.errors.password}
            </div>
          )}
        </div>
        <button
          disabled={formik.isSubmitting}
          type="submit"
          className={`btn w-full font-semibold  bg-myColor-800 hover:bg-transparent hover:text-myColor-900 hover:border-2 hover:border-myColor-700 ${
            formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          LogIn
        </button>
      </form>
      <p className="text-lg font-semibold text-center">Don't have an account? <Link to={"/signup"} className="text-myColor-700">Sign up</Link></p>
    </>
  );
}
