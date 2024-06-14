import React, { useState, useEffect } from "react";
import SideBar from "./sidebar";
import interceptor from "../../axios/admininterceptor";

function Adminorder() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchorders = async () => {
      try {
        const response = await interceptor.get("/api/admin/orders");
        setOrder(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchorders();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <div className="lg:w-1/5 w-full ">
        <SideBar />
      </div>
      <div className="flex-1 p-6 lg:p-12">
        <h1 className="text-3xl text-center font-normal mb-8 text-gray-800 uppercase">
          Order Details
        </h1>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Price
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {order.map((item, index) => (
                <tr key={index}>
                  <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.user.username}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                    {item.property?.place || "N/A"}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                    {item.date}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                    {item.total_amount}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                    {item.paymentId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Adminorder;
