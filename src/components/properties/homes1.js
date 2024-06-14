import React from "react";
import { useState, useEffect } from "react";
import { FaBath } from "react-icons/fa";
import { IoBed } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import interceptor from "../../axios/userinterceptor";

function Homes() {
  const [category, setCategory] = useState([]);
  const navigate =useNavigate()
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        

        const response = await interceptor.get(
            "/api/user/properties",{
             params: { category: "Homes" } ,
             
          }
        );

        setCategory(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 cursor-pointer">
          <h2 className="text-2xl font-bold tracking-tight text-orange-500 text-center">
            Our Homes
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {category.map((item) => (
              <div key={item.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={item.images[0]}
                    alt="imageh"
                  onClick={() => navigate(`/viewdetails/${item._id}`)}

                    className="h-full w-full object-cover object-center lg:h-full lg:w-full border border-black"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    {item.price}
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    <IoBed />
                    {item.bedrooms}
                  </p>
                  <p className=" d-flex text-sm font-medium text-gray-900">
                    <FaBath />
                    {item.bathrooms}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homes;
