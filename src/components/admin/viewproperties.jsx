import React, { useState, useEffect } from "react";
import { FaBath, FaBed, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import SideBar from "./sidebar";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import interceptor from "../../axios/admininterceptor";

function Viewproperty() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await interceptor.get("/api/admin/properties");
        setProperties(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleDelete = async (_id) => {
    const confirmed = window.confirm("Are you sure  ?");

    if (!confirmed) {
      return;
    }

    try {
      const response = await interceptor.delete(`/api/admin/properties/${_id}`);

      if (response.status === 200) {
        const updatedProperties = properties.filter((item) => item._id !== _id);
        setProperties(updatedProperties);
        console.log(response.data.message);
        toast.error("Successfully deleted property");
      } else {
        console.log("Failed to delete property:", response.statusText);
        toast.error("Failed to delete property");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("Error deleting property");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-1/4 h-screen">
        <SideBar />
      </div>
      <div className="flex-1 mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-orange-500 text-center w-full">
          Our Properties
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading
            ? Array(8)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col bg-white rounded-lg shadow-lg"
                  >
                    <div className="h-48 overflow-hidden rounded-t-lg">
                      <Skeleton height="100%" />
                    </div>
                    <div className="p-4 flex flex-col justify-between">
                      <div className="flex justify-between mb-2">
                        <Skeleton width="50%" />
                        <Skeleton width="20%" />
                        <Skeleton width="20%" />
                      </div>
                      <div className="flex justify-between items-center">
                        <Skeleton width="20px" height="20px" />
                        <Skeleton width="20px" height="20px" />
                      </div>
                    </div>
                  </div>
                ))
            : properties.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col bg-white rounded-lg shadow-lg"
                >
                  <div className="h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={item.images[0]}
                      alt="Property"
                      onClick={() => navigate(`/admin/singlepage/${item._id}`)}
                      className="object-cover w-full h-full cursor-pointer"
                    />
                  </div>

                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between mb-2">
                        <p className="text-sm font-medium text-gray-900">
                          {item.price}
                        </p>
                        <div className="flex items-center">
                          <FaBed className="mr-1" />
                          <span className="text-sm font-medium text-gray-900">
                            {item.bedrooms}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <FaBath className="mr-1" />
                          <span className="text-sm font-medium text-gray-900">
                            {item.bathrooms}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <FaEdit
                        className="text-yellow-500 cursor-pointer"
                        onClick={() =>
                          navigate(`/admin/edit/${item._id}`, {
                            initialValues: item,
                          })
                        }
                      />
                      <MdDelete
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDelete(item._id)}
                      />
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default Viewproperty;
