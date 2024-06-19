import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { signinSuccess } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import interceptor from "../axios/userinterceptor.js";

function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlegoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const response = await interceptor.post(
        "/api/auth/google",
        {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token, _id } = response.data;

      localStorage.setItem("usertoken", token);
      localStorage.setItem("_id", _id);

      dispatch(signinSuccess(response.data));

      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("user not found");
      } else if (error.response && error.response.status === 403) {
        toast.error("user is blocked");
      }
      console.log("Could not sign in with Google ", error.message);
    }
  };

  return (
    <button
      onClick={handlegoogle}
      type="button"
      className="flex items-center justify-center gap-2 bg-white text-black border border-black p-3 rounded-lg uppercase hover:opacity-95"
    >
      <FcGoogle className="text-2xl" />
      <span>Continue with Google</span>
    </button>
  );
}

export default OAuth;
