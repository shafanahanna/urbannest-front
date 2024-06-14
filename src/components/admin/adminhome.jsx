import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaShoppingCart, } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import interceptor from "../../axios/admininterceptor";
import SideBar from "./sidebar";

const AdminHome = () => {
  const [userCount, setUserCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const [propertyCount, setPropertyCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await interceptor.get("/api/admin/users");
        setUserCount(userResponse.data.datacount);
        setUsers(userResponse.data.data);

        const orderResponse = await interceptor.get("/api/admin/orders");
        setOrderCount(orderResponse.data.datacount);

        const propertyResponse = await interceptor.get("/api/admin/properties");
        setPropertyCount(propertyResponse.data.datacount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <SideBar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-700 mb-8">Hey, Admin</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <DashboardCard 
            title="New Users" 
            count={userCount} 
            icon={<FaUsers />} 
            color="bg-blue-600" 
            onClick={() => navigate("/admin/users")} 
          />
          <DashboardCard 
            title="Total Bookings" 
            count={orderCount} 
            icon={<FaShoppingCart />} 
            color="bg-green-600" 
            onClick={() => navigate("/admin/orders")} 
          />
          <DashboardCard 
            title="Available Packages" 
            count={propertyCount} 
            icon={<IoHome />} 
            color="bg-red-600" 
            onClick={() => navigate("/admin/viewproperty")} 
          />
        </div>

        <div className="mt-8">
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm leading-4 text-gray-600 tracking-wider">Profile</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm leading-4 text-gray-600 tracking-wider">Username</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm leading-4 text-gray-600 tracking-wider">Email</th>
                  <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-sm leading-4 text-gray-600 tracking-wider">Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 border-b border-gray-200">
                      <img src={user.profile} alt="Profile" className="h-12 w-12 rounded-full object-cover" />
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">{user.username}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{user.email}</td>
                    <td className="px-6 py-4 border-b border-gray-200">{user.phoneNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, count, icon, color, onClick }) => (
  <div 
    className={`p-6 rounded-lg shadow-lg text-white flex items-center cursor-pointer transform transition-transform hover:scale-105 ${color}`} 
    onClick={onClick}
  >
    <div className="text-4xl mr-4">
      {icon}
    </div>
    <div>
      <h3 className="text-2xl font-bold">{count}</h3>
      <h4 className="text-lg">{title}</h4>
    </div>
  </div>
);

export default AdminHome;
