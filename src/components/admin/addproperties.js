import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaBed, FaBath } from "react-icons/fa";
import { SlSizeFullscreen } from "react-icons/sl";
import SideBar from "./sidebar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import interceptor from "../../axios/admininterceptor";
import { BeatLoader } from "react-spinners";

const AddProperty = () => {
  const [loading, setLoading] = useState(false);
  const [Category, setCategory] = useState([]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    place: Yup.string().required("Required"),
    price: Yup.number().required("Required"),
    bedrooms: Yup.number().required("Required"),
    bathrooms: Yup.number().required("Required"),
    size: Yup.number().required("Required"),
    description: Yup.string().required("Required"),
    images: Yup.array().min(1, "At least one image is required"),
  });

  useEffect(() => {
    const fetchcategory = async () => {
      try {
        const response = await interceptor.get("/api/admin/categories");
        setCategory(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchcategory();
  }, []);

  const handleSubmit = async (formData, { resetForm }) => {
    console.log("Form submitted:", formData); // Check if handleSubmit is called
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("place", formData.place);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("bedrooms", formData.bedrooms);
      formDataToSend.append("bathrooms", formData.bathrooms);
      formDataToSend.append("size", formData.size);
      formDataToSend.append("description", formData.description);
      for (let i = 0; i < formData.images.length; i++) {
        formDataToSend.append("images", formData.images[i]);
      }

      const response = await interceptor.post(
        "/api/admin/properties",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success(response.data.message);
        resetForm();
      } else {
        toast.error(response.data.message || "Error submitting form.");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized. Check your authentication credentials.");
      } else {
        toast.error("An error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex">
      <div className="h-screen">
        <SideBar />
      </div>
      <div className="max-w-md mx-auto mt-8 h-max p-6 bg-white rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-center text-orange-900 uppercase">
          Add Property
        </h2>
        <Formik
          initialValues={{
            name: undefined, 
            category: undefined,
            place: undefined,
            price: undefined,
            bedrooms: undefined,
            bathrooms: undefined,
            size: undefined,
            description: undefined,
            images: [],
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="space-y-4">
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-300"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />

              <Field
                as="select"
                id="category"
                name="category"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-300"
              >
                <option value="">Select Category</option>
                {Category.map((item) => (
                  <option key={item._id} value={item.category}>
                    {item.category}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500"
              />

              <Field
                type="text"
                id="place"
                name="place"
                placeholder="Place"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-300"
              />
              <ErrorMessage
                name="place"
                component="div"
                className="text-red-500"
              />

              <Field
                type="number"
                id="price"
                name="price"
                placeholder="Price"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-300"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500"
              />

              <div className="flex space-x-4">
                <div className="flex items-center">
                  <FaBed size={20} className="mr-2" />
                  <Field
                    type="number"
                    id="bedrooms"
                    name="bedrooms"
                    placeholder="Bed"
                    className="w-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-300"
                  />
                </div>
                <ErrorMessage
                  name="bedrooms"
                  component="div"
                  className="text-red-500"
                />

                <div className="flex items-center">
                  <FaBath size={20} className="mr-2" />
                  <Field
                    type="number"
                    id="bathrooms"
                    name="bathrooms"
                    placeholder="Bath"
                    className="w-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-300"
                  />
                </div>
                <ErrorMessage
                  name="bathrooms"
                  component="div"
                  className="text-red-500"
                />

                <div className="flex items-center">
                  <SlSizeFullscreen size={20} className="mr-2" />
                  <Field
                    type="number"
                    id="size"
                    name="size"
                    placeholder="Size"
                    className="w-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-300"
                  />
                </div>
                <ErrorMessage
                  name="size"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <Field
                as="textarea"
                id="description"
                name="description"
                placeholder="Description"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-300"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500"
              />

              <input
                type="file"
                id="images"
                name="images"
                onChange={(event) => {
                  const files = Array.from(event.currentTarget.files);
                  setFieldValue("images", files);
                }}
                multiple
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-300"
              />
              <ErrorMessage
                name="images"
                component="div"
                className="text-red-500"
              />

              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-300 focus:outline-none focus:bg-orange-300"
                disabled={loading}
              >
                {loading ? (
                  <BeatLoader color="#fff" size={10} />
                ) : (
                  "Add Property"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddProperty;
