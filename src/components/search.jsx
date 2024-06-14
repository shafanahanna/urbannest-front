import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Search() {
  const [search, setSearch] = useState("");
  const [propertyToShow, setPropertyToShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const place = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const token = localStorage.getItem("usertoken");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const searchParams = new URLSearchParams(place.search);
        const locationQuery = searchParams.get("place");
        const categoryQuery = searchParams.get("category");
        setSearch(locationQuery);

        const response = await axios.get(
          `http://localhost:3000/api/user/search?place=${locationQuery}&category=${categoryQuery}`,
          { headers }
        );

        if (response.data.status === "error") {
          throw new Error(response.data.message);
        }

        const data = response.data.data;
        const foundProperty = data.find(
          (property) => property.place === locationQuery
        );
        setPropertyToShow(foundProperty);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        if (error.response && error.response.status === 404) {
          setError(" sorry!.. Not Available");
        }
        setLoading(false);
      }
    };

    fetchProperty();
  }, [place]);

  return (
    <div className="px-4 py-8">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : propertyToShow ? (
        <div className="bg-slate-300 p-4 shadow-md rounded-md w-80 h-max">
          <div key={propertyToShow._id} className="relative">
            <img
              src={propertyToShow.images[0]}
              alt={propertyToShow.place}
              className="w-full h-48 object-cover rounded-t-md"
            />
            <div className="p-4 text-center">
              <h3 className="font-bold text-xl mb-2">{propertyToShow.place}</h3>
              <p className="mb-2">Price: ${propertyToShow.price}</p>

              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={() => navigate(`/viewdetails/${propertyToShow._id}`)}
              >
                View
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">No package found for "{search}".</div>
      )}
    </div>
  );
}

export default Search;
