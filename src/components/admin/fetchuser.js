import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SideBar from "./sidebar";
import { TbLockOff } from "react-icons/tb";
import { TbLockOpen } from "react-icons/tb";
import interceptor from "../../axios/admininterceptor";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await interceptor.get("/api/admin/users");

        setUsers(response.data.data);
      } catch (error) {
        // console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  const handleLock = async (_id, isBlocked) => {
    try {
      const action = isBlocked ? "unblock" : "block";
      const response = await interceptor.patch(
        `/api/admin/users/${_id}?action=${action}`,
        {}
      );
      setUsers((prevUsers) =>
        prevUsers.map((item) =>
          item._id === _id ? { ...item, isBlocked: !item.isBlocked } : item
        )
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error locking/unlocking user:", error);
    }
  };

  return (
    <div className="d-flex flex">
      <div className="h-screen">
        <SideBar />
      </div>
      <div className="max-w-full mx-auto mt-8 p-6 h-max bg-white rounded-md shadow-md overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4 text-center text-orange-900 uppercase">
          User List
        </h2>
        {users.length === 0 ? (
          <p className="text-center">No users found</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profile
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PhoneNumber
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Block
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={user.profile}
                      alt={`${user.username}'s profile`}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.phoneNumber}
                  </td>
                  <div className="flex justify-center items-center">
                  {user.isBlocked ? (
                    <div >
                      <TbLockOff
                        className="text-red-500 w-6 h-6   cursor-pointer"
                        onClick={() => handleLock(user._id, true)}
                      />
                    </div>
                  ) : (
                    <div className="flex justify-center items-center">
                      <TbLockOpen
                        className="text-green-500 w-6 h-6  cursor-pointer"
                        onClick={() => handleLock(user._id, false)}
                      />
                    </div>
                    
                  )}
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserList;
