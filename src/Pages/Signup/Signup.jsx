import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { object, ref, string } from "yup";

export default function Signup() {
  const navigate = useNavigate();
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const phoneRegex = /^01[0125][0-9]{8}$/;

  const [data, setdata] = useState(null);
  const validationSchema = object({
    name: string()
      .required("please enter name")
      .min(3, "name should be more than 3 Characters")
      .max(20, "name should be less than 20 Characters"),
    email: string().email("email is invalid").required("please enter email"),
    password: string()
      .required("please enter password")
      .matches(
        passwordRegex,
        "password should be Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
    rePassword: string()
      .required("please enter rePassword")
      .oneOf([ref("password")], "password and rePassword should be same"),
    phone: string()
      .required("please enter your phone number")
      .matches(phoneRegex, "we accept egyptian numbers only"),
  });

  async function onSubmit(values) {
    const toastid = toast.loading("Wait..");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      setdata(data);
      if (data.message == "success") {
        navigate("/login");
      }

      toast.update(toastid, {
        render: "account created Successfully",
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
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit,
    validationSchema,
  });
  return (
    <>
      <h1 className="font-bold text-slate-500 text-xl">
        <i className="fa-solid fa-user text-myColor-500"></i> Register Now
      </h1>
      <form className="form py-5 space-y-5" onSubmit={formik.handleSubmit}>
        <div className="nameInput">
          <input
            type="text"
            className="form-control w-full"
            placeholder="Type your Name..."
            name="name"
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-600 text-sm mt-1">
              {formik.errors.name}
            </div>
          )}
        </div>
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
        <div className="rePasswordInput">
          <input
            type="password"
            className="form-control w-full"
            placeholder="enter Password Again..."
            name="rePassword"
            value={formik.values.rePassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.rePassword && formik.errors.rePassword && (
            <div className="text-red-600 text-sm mt-1">
              {formik.errors.rePassword}
            </div>
          )}
        </div>
        <div className="phoneInput">
          <input
            type="tel"
            className="form-control w-full"
            placeholder="enter your phone..."
            name="phone"
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="text-red-600 text-sm mt-1">
              {formik.errors.phone}
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
          SignUp
        </button>
      </form>
      <p className="text-lg font-semibold text-center">
        You already have Account?
        <Link to={"/login"} className="text-myColor-700">
          Log in
        </Link>
      </p>
    </>
  );
}
