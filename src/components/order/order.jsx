import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCloudDownloadAlt } from "react-icons/fa";
import html2canvas from "html2canvas";
import interceptor from "../../axios/userinterceptor";

function Order() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await interceptor.get(`/api/user/order/${id}`);
        setOrder(response.data.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [id]);

  const downloadpage = () => {
    const orderDetailsElement = document.getElementById("order-details");
    const downloadContainer = document.querySelector(".download-container");

    if (downloadContainer) {
      downloadContainer.style.display = "none";
    }

    html2canvas(orderDetailsElement).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `order_${id}.png`;
      link.click();

      if (downloadContainer) {
        downloadContainer.style.display = "flex";
      }
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      id="order-details"
      className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md m-5"
    >
      <div className="mb-4">
        <h1 className="text-xl font-bold text-indigo-700 mb-2 text-center">
          Order Details
        </h1>
        <table className="w-full border-collapse border-2 border-gray-200">
          <tbody>
            <tr className="border-b">
              <td className="p-2 border-r">User</td>
              <td className="p-2">{order.user.username}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 border-r">Property</td>
              <td className="p-2">{order.property.name}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 border-r">Date</td>
              <td className="p-2">{order.date}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 border-r">Time</td>
              <td className="p-2">{order.time}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 border-r">Total Amount</td>
              <td className="p-2">₹{order.total_amount}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-purple-700 mb-2 text-center">
          Order Information
        </h2>
        <table className="w-full border-collapse border-2 border-gray-200">
          <tbody>
            <tr className="border-b">
              <td className="p-2 border-r">Total cost</td>
              <td className="p-2">₹{order.total_amount}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 border-r">GST 18%</td>
              <td className="p-2">₹{(order.total_amount * 0.18).toFixed(2)}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 border-r">Net Amount</td>
              <td className="p-2">
                ₹
                {(
                  parseFloat(order.total_amount) +
                  order.total_amount * 0.18
                ).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold text-green-700">Order Confirmed...</h2>
        <p className="text-gray-700 mt-2">
          Your order is confirmed. Thank you for choosing UrbanNest!
        </p>
      </div>
      <div
        className="download-container flex justify-center items-center cursor-pointer p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
        onClick={downloadpage}
        title="Download Booking Details"
      >
        <FaCloudDownloadAlt className="mr-2" />
        <span>Download</span>
      </div>
    </div>
  );
}

export default Order;
