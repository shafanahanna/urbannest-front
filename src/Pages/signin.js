import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  signinSuccess,
  signinFailure,
  signinStart,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignInSuccess = (user, token) => {
    localStorage.setItem("usertoken", token);
    localStorage.setItem("currentUser", JSON.stringify(user));
    dispatch(signinSuccess(user));
    navigate("/");
    toast.success("Login successful");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signinStart());

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/signin",
        formData
      );

      if (response.data.token && response.data.user) {
        handleSignInSuccess(response.data.user, response.data.token);
      } else {
        throw new Error("Token or user data not found in response");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      dispatch(signinFailure(error.message));
      toast.error(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          disabled={loading}
        >
          {loading ? "Loading" : "Sign In"}
        </button>
        <p className="text-center">OR</p>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to="/signup">
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-6">{error}</p>}
    </div>
  );
}

export default SignIn;
