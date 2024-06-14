import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

function Contact() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      phone: Yup.string()
        .matches(
          /^(\+?\d{1,4}[-.\\s]?|0)?[1-9]\d{1,14}$/,
          "Invalid phone number"
        )
        .required("Required"),
      message: Yup.string()
        .min(10, "Must be at least 10 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("usertoken");

        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.post(
          "http://localhost:3000/api/user/sendmail",
          values,
          { headers }
        );
        console.log(response.data,"qwerty")
        toast("Message sent successfully!");
      } catch (error) {
        console.error("Error:", );
      }
    },
  });

  return (
    <div>
      <section className="lg:w-95% w-full h-fit m-auto grid lg:grid-cols-2 grid-cols-1 justify-center items-center lg:px-36 px-6 py-20 gap-10">
        <div className="bg-gray-800 p-10 flex flex-col justify-center items-start gap-4 rounded-xl border-2 border-black">
          <h1 className="text-2xl text-white font-semibold">
            Send a message today
          </h1>
          <form onSubmit={formik.handleSubmit} className="w-full">
            <div className="mb-4">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                className="w-full px-6 py-3 border-2 border-gray-400 rounded-xl"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-600">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your valid email"
                className="w-full px-6 py-3 border-2 border-gray-400 rounded-xl"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-600">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your valid phone number"
                className="w-full px-6 py-3 border-2 border-gray-400 rounded-xl"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="text-red-600">{formik.errors.phone}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <textarea
                id="message"
                name="message"
                placeholder="Enter your message here..."
                className="w-full px-6 py-3 border-2 border-gray-400 rounded-xl"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
              />
              {formik.touched.message && formik.errors.message ? (
                <div className="text-red-600">{formik.errors.message}</div>
              ) : null}
            </div>
            <button
              type="submit"
              className="bg-blue-500 w-full text-md px-8 py-3 text-white font-semibold rounded-xl hover:bg-blue-800 cursor-pointer"
            >
              SEND EMAIL
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Contact;
