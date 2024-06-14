import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBath, FaBed } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import interceptor from "../../axios/userinterceptor";

function Property() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await interceptor.get("/api/user/properties");
        setProperties(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <>
      <div className="bg-gray-100">
        <div className="container mx-auto py-16">
          <h2 className="text-3xl font-bold text-orange-500 mb-8 text-center">
            Properties
          </h2>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {loading
              ? Array(8)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg overflow-hidden shadow-md"
                    >
                      <Skeleton height={200} />
                      <div className="p-4">
                        <Skeleton height={20} width="80%" />
                        <Skeleton height={20} width="60%" />
                        <Skeleton height={20} width="40%" />
                      </div>
                    </div>
                  ))
              : properties.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg overflow-hidden shadow-md"
                  >
                    <img
                      src={item.images[0]}
                      alt="Property"
                      className="w-full h-48 object-cover object-center cursor-pointer"
                      onClick={() => navigate(`/viewdetails/${item._id}`)}
                    />
                    <div className="p-4">
                      <p className="text-lg font-semibold text-gray-800 mb-2">
                        {item.name}
                      </p>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold mb-6">Price:</span>{" "}
                          {item.price}
                        </p>
                        <div className="flex items-center text-sm text-gray-600">
                          <FaBed className="mr-1" />
                          {item.bedrooms}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <FaBath className="mr-1" />
                          {item.bathrooms}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Property;
