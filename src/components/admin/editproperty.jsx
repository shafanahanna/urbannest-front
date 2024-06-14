import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";

import { toast } from "react-toastify";
import interceptor from "../../axios/admininterceptor";
import SideBar from "./sidebar";

function Adminedit() {
  const { _id } = useParams();
  const [Category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      category: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      description: "",
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      category: Yup.string().required("Category is required"),
      price: Yup.number().required("Price is required"),
      bedrooms: Yup.number().required("Bedrooms is required"),
      bathrooms: Yup.number().required("Bathrooms is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await interceptor.put(`/api/admin/properties/${_id}`, values);
        console.log(response);
        toast.success("Updated successfully");
      } catch (error) {
        console.error("Error updating property:", error);
        toast.error("Failed to update property.");
      } finally {
        setLoading(false);
      }
    },
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

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await interceptor.get(`/api/admin/properties/${_id}`);
        const propertyData = response.data.data;
        formik.setValues({
          name: propertyData.name || "",
          category: propertyData.category || "",
          price: propertyData.price || "",
          bedrooms: propertyData.bedrooms || "",
          bathrooms: propertyData.bathrooms || "",
          description: propertyData.description || "",
        });
      } catch (error) {
        console.error("Error fetching property:", error);
        toast.error("Failed to fetch property details.");
      }
    };

    fetchProperty();
  }, [_id,formik]);

  return (
    <div className="flex  ">
      <div className="w-1/4 text-white h-screen">
        <SideBar />
      </div>
      <div className="flex-1 p-8">
        <form
          onSubmit={formik.handleSubmit}
          className="max-w-md mx-auto bg-white shadow-md  rounded m-10 px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter name"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description:
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter description"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Category:
            </label>
            <select
              id="category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Category</option>
              {Category.map((item) => (
                <option key={item._id} value={item.category}>
                  {item.category}
                </option>
              ))}
            </select>
            {formik.touched.category && formik.errors.category && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.category}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="bedrooms"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Beds:
            </label>
            <input
              type="text"
              id="bedrooms"
              name="bedrooms"
              value={formik.values.bedrooms}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter number of bedrooms"
            />
            {formik.touched.bedrooms && formik.errors.bedrooms && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.bedrooms}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="bathrooms"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Bath:
            </label>
            <input
              type="text"
              id="bathrooms"
              name="bathrooms"
              value={formik.values.bathrooms}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter number of bedrooms"
            />
            {formik.touched.bathrooms && formik.errors.bathrooms && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.bathrooms}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Price:
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter price"
            />
            {formik.touched.price && formik.errors.price && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.price}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            disabled={loading} // Disable the button when loading is true
          >
            {loading ? <BeatLoader color="#ffffff" size={8} /> : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Adminedit;
