import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import interceptor from "../../axios/admininterceptor";
import { FadeLoader } from "react-spinners";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
});

function Adminlogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const response = await interceptor.post("/api/admin/login", values);
      const { data } = response.data;
      console.log(data, "login");
      localStorage.setItem("admintoken", data);
      navigate("/admin/home");
      toast.success("Login successful");
    } catch (error) {
      console.log("login failed", error.response.data);
      toast.error("An error occurred during login");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            <div>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="border p-3 rounded-lg w-full"
              />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>
            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="border p-3 rounded-lg w-full"
              />
              <ErrorMessage name="password" component="div" className="text-red-500" />
            </div>
            <button
              type="submit"
              className="bg-green-800 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              disabled={isSubmitting || loading}
            >
              {loading ? <FadeLoader color="#ffffff" size={10} /> : "Sign In"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Adminlogin;
