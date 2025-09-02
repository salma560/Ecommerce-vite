import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { UserContext } from "../../context/User.context";
import axios from "axios";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { cartContext } from "../../context/Cart.context";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [paymentMethod, setpaymentMethod] = useState(null);
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const { cartProducts } = useContext(cartContext);

  // ✅ Validation
  const validationSchema = Yup.object({
    shippingAddress: Yup.object({
      details: Yup.string().required("Details is required"),
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/, "Phone is invalid")
        .required("Phone is required"),
      city: Yup.string().required("City is required"),
    }),
  });

  // ✅ Create Cash Order
  async function CreateCashOrder(values) {
    const toastid = toast.loading("Wait..");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartProducts.cartId}`,
        method: "POST",
        headers: {
          token,
        },
        data: values,
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.update(toastid, {
          render: "Order placed successfully ✅",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/allorders");
        }, 2000);
      }
    } catch (error) {
      toast.update(toastid, {
        render: "Order failed ❌",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      console.error("Order failed:", error);
    }
  }

  // ✅ Online Payment
  async function onlinePayment(values) {
    const toastid = toast.loading("Redirecting..");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartProducts.cartId}?url=${location.origin}`,
        method: "POST",
        headers: {
          token,
        },
        data: values,
      };
      const { data } = await axios.request(options);
      if (data.status === "success") {
        toast.update(toastid, {
          render: "Redirecting to payment ✅",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        setTimeout(() => {
          location.href = data.session.url;
        }, 2000);
      }
    } catch (error) {
      toast.update(toastid, {
        render: "Payment failed ❌",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      console.error("Online order failed:", error);
    }
  }

  // ✅ Formik setup
  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    validationSchema,
    onSubmit: (values) => {
      if (paymentMethod === "cash") {
        CreateCashOrder(values);
      } else if (paymentMethod === "online") {
        onlinePayment(values);
      } else {
        toast.error("Please choose a payment method.");
      }
    },
  });

  return (
    <>
      <h1 className="text-xl font-bold text-myColor-800">Shipping Address:</h1>
      <form className="space-y-3 mt-3" onSubmit={formik.handleSubmit}>
        {/* ✅ City dropdown */}
        <select
          name="shippingAddress.city"
          className="form-control w-full"
          value={formik.values.shippingAddress.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="">اختر المحافظة</option>
          <option value="القاهرة">القاهرة</option>
          <option value="الجيزة">الجيزة</option>
          <option value="الإسكندرية">الإسكندرية</option>
          <option value="الدقهلية">الدقهلية</option>
          <option value="البحر الأحمر">البحر الأحمر</option>
          <option value="البحيرة">البحيرة</option>
          <option value="الفيوم">الفيوم</option>
          <option value="الغربية">الغربية</option>
          <option value="الإسماعيلية">الإسماعيلية</option>
          <option value="المنوفية">المنوفية</option>
          <option value="المنيا">المنيا</option>
          <option value="القليوبية">القليوبية</option>
          <option value="الوادي الجديد">الوادي الجديد</option>
          <option value="السويس">السويس</option>
          <option value="اسوان">أسوان</option>
          <option value="اسيوط">أسيوط</option>
          <option value="بني سويف">بني سويف</option>
          <option value="بورسعيد">بورسعيد</option>
          <option value="دمياط">دمياط</option>
          <option value="الشرقية">الشرقية</option>
          <option value="جنوب سيناء">جنوب سيناء</option>
          <option value="كفر الشيخ">كفر الشيخ</option>
          <option value="مطروح">مطروح</option>
          <option value="الأقصر">الأقصر</option>
          <option value="قنا">قنا</option>
          <option value="شمال سيناء">شمال سيناء</option>
          <option value="سوهاج">سوهاج</option>
        </select>
        {formik.touched.shippingAddress?.city &&
          formik.errors.shippingAddress?.city && (
            <p className="text-red-500 text-sm">
              {formik.errors.shippingAddress.city}
            </p>
          )}

        {/* ✅ Phone input */}
        <input
          type="text"
          placeholder="Phone"
          className="form-control w-full"
          name="shippingAddress.phone"
          value={formik.values.shippingAddress.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.shippingAddress?.phone &&
          formik.errors.shippingAddress?.phone && (
            <p className="text-red-500 text-sm">
              {formik.errors.shippingAddress.phone}
            </p>
          )}

        {/* ✅ Details input */}
        <textarea
          placeholder="Detailed address"
          className="form-control w-full"
          name="shippingAddress.details"
          value={formik.values.shippingAddress.details}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        ></textarea>
        {formik.touched.shippingAddress?.details &&
          formik.errors.shippingAddress?.details && (
            <p className="text-red-500 text-sm">
              {formik.errors.shippingAddress.details}
            </p>
          )}

        {/* ✅ Payment buttons */}
        <div className="space-x-3">
          <button
            type="button"
            disabled={formik.isSubmitting}
            onClick={() => {
              setpaymentMethod("cash");
              formik.submitForm();
            }}
            className={`btn bg-myColor-700 text-white hover:bg-myColor-900 font-semibold`}
          >
            Cash Order
          </button>
          <button
            type="button"
            disabled={formik.isSubmitting}
            onClick={() => {
              setpaymentMethod("online");
              formik.submitForm();
            }}
            className={`btn bg-blue-700 text-white hover:bg-blue-900 font-semibold`}
          >
            Online Payment
          </button>
        </div>
      </form>
    </>
  );
}
