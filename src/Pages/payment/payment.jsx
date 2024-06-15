import React, { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import interceptor from "../../axios/userinterceptor";

function Payment() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const price = searchParams.get("price");
  const PropertyId = searchParams.get("PropertyId");
  const { property } = location.state || {};
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handlePayment = async () => {
    setLoading(true);
    const userToken = localStorage.getItem("usertoken");
    const userId = localStorage.getItem("_id");
    const headers = userToken ? { Authorization: `Bearer ${userToken}` } : {};

    if (!userToken) {
      console.log("token not found..");
      setLoading(false);
      return;
    }
    try {
      const orderResponse = await interceptor.post(
        "/api/user/order",
        { userId: userId, PropertyId, amount: price, currency: "INR" },
        { headers }
      );

      const { payment_id, _id: orderId } = orderResponse.data.data;

      const amount = property.price * 100;
      const currency = "INR";
      const receipt = `receipt_${Date.now()}`;

      const response = await interceptor.post(
        "/api/user/payment",
        {
          amount,
          currency,
          receipt,
          payment_id,
        },
        { headers: headers }
      );

      const {
        data: { data: paymentData },
      } = response;

      const options = {
        key: process.env.REACT_APP_Razorpay,
        amount: paymentData.amount,
        currency: paymentData.currency,
        name: "UrbanNest",
        description: "Test Transaction",
        order_id: paymentData.id,
        handler: function (response) {
          alert(`Order ID: ${response.razorpay_order_id}`);
          const orderDetails = {
            id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          };
          navigate(`/order-details/${orderId}`, {
            state: { order: orderDetails, property },
          });
        },
        prefill: {
          name: currentUser.name,
          email: currentUser.email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!property) {
    return <p>Loading property details...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-6">
      <h1 className="text-3xl font-semibold mb-6">Payment Page for Property</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        {property.images && property.images.length > 0 && (
          <div className="mb-6">
            <img
              className="w-full h-64 object-cover rounded-md"
              src={property.images[0]}
              alt="Property"
            />
          </div>
        )}
        <h2 className="text-2xl font-bold mb-4">{property.title}</h2>
        <p className="text-gray-700 mb-4">{property.description}</p>
        <div className="space-y-2 mb-6">
          <p>
            <span className="font-semibold">Price:</span> ₹{property.price}
          </p>
          <p>
            <span className="font-semibold">Place:</span> {property.place}
          </p>
          <p>
            <span className="font-semibold">Bath:</span> {property.bathrooms}
          </p>
          <p>
            <span className="font-semibold">Size:</span> {property.size}
          </p>
          <p>
            <span className="font-semibold">Beds:</span> {property.bedrooms}
          </p>
        </div>
        <button
          onClick={handlePayment}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white uppercase font-bold rounded-sm py-3 transition duration-300 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? <ClipLoader color="#ffffff" size={24} /> : "Pay Now"}
        </button>
      </div>
    </div>
  );
}

export default Payment;
