import { useSelector, useDispatch } from "react-redux";
import {
  deleteaccntFail,
  deleteaccntStart,
  deleteaccntSuccess,
  signout,
  updateUserStart,
  updateUserSuccess,
  updateUserFail,
} from "../redux/user/userSlice";
import { useRef, useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import  app  from "../firebase";
import { useNavigate } from "react-router-dom";
import interceptor from "../axios/userinterceptor";

function Profile() {
  const fileRef = useRef("");
  const [file, setFile] = useState(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, loading } = useSelector((state) => state.user);

  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    profile: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username || "",
        email: currentUser.email || "",
        password: "",
        phoneNumber: currentUser.phoneNumber || "",
        profile: currentUser.profile || "",
      });
    } else {
      console.log("No current user");
    }
  }, [currentUser]);

  const handleFileUpload = useCallback((file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prevData) => ({ ...prevData, profile: downloadURL }));
        });
      }
    );
  }, []);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file, handleFileUpload]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!currentUser || !currentUser.id) {
      toast.error("User ID is missing");
      return;
    }

    try {
      dispatch(updateUserStart());
      const response = await interceptor.put(
        `/api/user/users/${currentUser.id}`,
        formData
      );

      const data = response.data;

      if (!data.success) {
        dispatch(updateUserFail(data.message));
        toast.error(data.message);
        return;
      }

      dispatch(updateUserSuccess(data.user));
      toast.success("Profile updated successfully");
    } catch (error) {
      dispatch(updateUserFail(error.message));
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  };

  const handleSignout = () => {
    localStorage.removeItem("usertoken");
    dispatch(signout());
    navigate("/");
    toast.error("Logout");
  };

  const handleDelete = async () => {
    if (!currentUser || !currentUser.id) {
      toast.error("User ID is missing");
      return;
    }

    try {
      dispatch(deleteaccntStart());
      const response = await interceptor.delete(`/api/user/users/${currentUser.id}`);
      const data = response.data;

      if (!data.success) {
        dispatch(deleteaccntFail(data.message));
        return;
      }

      dispatch(deleteaccntSuccess());
      toast.success("Account deleted successfully");
      navigate("/");
    } catch (error) {
      dispatch(deleteaccntFail(error.message));
      console.error("Error deleting account:", error);
      toast.error("Error deleting account");
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.profile || currentUser.profile}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload(image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700"> Image successfully uploaded</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="Email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          id="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDelete} className="text-red-700 cursor-pointer">
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer" onClick={handleSignout}>
          Sign Out
        </span>
      </div>
    </div>
  );
}

export default Profile;
