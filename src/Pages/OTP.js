import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function OTPVerification() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const formData = location.state?.formData;
  const phoneNumber = formData?.phoneNumber;
  console.log(formData, "****");
  console.log(phoneNumber, "*****");

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const otpVerificationResponse = await axios.post(
        "http://localhost:3000/api/user/verifyotp",
        { phoneNumber, otp }
      );

      if (otpVerificationResponse.data.success) {
        try {
          const response = await axios.post(
            "http://localhost:3000/api/user/signup",
            formData,
            { headers: { "Content-Type": "application/json" } }
          );
          console.log("res: ", response);
          console.log("status:", response.data.status);

          if (response.data.status === "success") {
            navigate("/signin");
          } else {
            setError(response.data.message);
          }
        } catch (error) {
          console.error("Error during registration:", error);
          setError(
            "An error occurred during registration. Please try again later."
          );
        }
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        OTP Verification
      </h1>
      <form onSubmit={handleVerifyOTP} className="mt-4">
        <label htmlFor="otp" className="block mb-2">
          Enter OTP sent to your phone:
        </label>
        <input
          type="text"
          id="otp"
          maxLength={6}
          placeholder="Enter OTP"
          value={otp}
          onChange={handleOtpChange}
          className="border p-3 rounded-lg w-full"
          required
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 mt-2"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-6">{error}</p>}
    </div>
  );
}

export default OTPVerification;
