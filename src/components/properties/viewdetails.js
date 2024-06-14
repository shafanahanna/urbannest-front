import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaWhatsappSquare } from "react-icons/fa";
import interceptor from "../../axios/userinterceptor";

function ViewDetails() {
  const [properties, setProperties] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const usertoken = localStorage.getItem("usertoken");

        if (!usertoken) {
          toast("Please login");
          navigate("/signin");
          return;
        }
        const response = await interceptor.get(`/api/user/properties/${id}`);
        setProperties(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id, navigate]);

  const handleBuyNow = () => {
    navigate(
      `/payment/${id}?price=${properties.price}&place=${properties.place}&PropertyId=${id}`,
      { state: { property: properties } }
    );
  };

  return (
    <>
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {properties && (
        <>
          <h2 className="text-orange-500 text-center p-3 text-4xl font-bold">
            {properties.name}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-2">
              {properties.images.length > 0 && (
                <img
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
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
            <div className="p-4 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Description</h3>
              <p>{properties.description}</p>
              <div className="flex items-center justify-start mt-6 space-x-4">
                <button className="bg-green-600 hover:bg-green-700 text-white rounded-lg uppercase px-4 py-2 transition duration-300">
                  Contact Agent
                </button>
                <a
                  href="https://api.whatsapp.com/send?phone=8113834993"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800 transition duration-300 flex items-center"
                >
                  <FaWhatsappSquare className="text-4xl" />
                  <span className="text-xl ml-2">Chat with us</span>
                </a>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-lg">
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
              <div className="text-center mt-6">
                <button
                  onClick={handleBuyNow}
                  className="bg-blue-500 hover:bg-blue-700 text-white uppercase font-bold rounded-lg px-4 py-2 transition duration-300"
                >
                  Buy now
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
    </>
  );
}

export default ViewDetails;
