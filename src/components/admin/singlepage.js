import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBar from "./sidebar";
import interceptor from "../../axios/admininterceptor";

function SinglePage() {
  const [properties, setProperties] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await interceptor.get(`/api/admin/properties/${id}`);
        setProperties(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProperty();
  }, [id]);

  return (
    <div className="flex h-screen">
      <div className="h-screen">
        <SideBar />
      </div>
      <div className="flex-grow">
        <h2 className="text-orange-500 text-center p-5">Property Details</h2>
        {properties && (
          <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-2">
                {properties.images.length > 0 && (
                  <img
                    className="w-full h-auto object-cover rounded-lg "
                    src={properties.images[0]}
                    alt="Property"
                  />
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {properties.images.slice(1).map((image, index) => (
                  <div key={index} className="col-span-1">
                    <img
                      className="w-full h-auto object-cover rounded-lg shadow-lg"
                      src={image}
                      alt="Property"
                    />
                  </div>
                ))}
              </div>
            </div>

            <h3 className="text-2xl font-semibold mt-8">About the Property</h3>
            <hr className="my-4" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div className="bg-white rounded-lg ">
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-4">Description</h3>
                  <p>{properties.description}</p>
                </div>
              </div>
              <div className="bg-white rounded-lg ">
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-4">Details</h3>
                  <p>
                    <strong className="font-semibold">⚫ PLACE:</strong> {properties.place}
                  </p>
                  <p>
                    <strong className="font-semibold">⚫ PRICE:</strong> ₹{properties.price}/-
                  </p>
                  <p>
                    <strong className="font-semibold">⚫ BATH:</strong> {properties.bathrooms}
                  </p>
                  <p>
                    <strong className="font-semibold">⚫ SIZE:</strong> {properties.size}
                  </p>
                  <p>
                    <strong className="font-semibold">⚫ BEDS:</strong> {properties.bedrooms}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SinglePage;
