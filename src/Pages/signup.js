import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function SignUp() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be  10 digits")
      .required("Phone number is required"),
  });

  const handleSignUp = async (values, { setSubmitting, setErrors }) => {
    try {
      setLoading(true);
      const otpResponse = await axios.post(
        "http://localhost:3000/api/user/send-otp",
        { phoneNumber: values.phoneNumber }
      );
      if (otpResponse.data.success) {
        toast.success("Registration successful");
        setLoading(false);
        navigate("/otp-verification", { state: { formData: values } });
      } else {
        setErrors({ server: otpResponse.data.message });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
      setErrors({ server: error.message });
      setLoading(false);
    }
    setSubmitting(false);
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign up</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignUp}
      >
        {({ isSubmitting, errors }) => (
          <Form className="flex flex-col gap-4">
            <div>
              <Field
                type="text"
                name="username"
                placeholder="Username"
                className="border p-3 rounded-lg w-full"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 mt-1"
              />
            </div>
            <div>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="border p-3 rounded-lg w-full"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 mt-1"
              />
            </div>
            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="border p-3 rounded-lg w-full"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 mt-1"
              />
            </div>
            <div>
              <Field
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                className="border p-3 rounded-lg w-full"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 mt-1"
              />
            </div>
            <button
              type="submit"
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              disabled={isSubmitting || loading}
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
            <p className="text-center">OR</p>
            <OAuth />
          </Form>
        )}
      </Formik>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/signin"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
