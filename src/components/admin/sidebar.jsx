import React, { useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SideBar = () => {
  const [ setLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admintoken");
    setLogin(false);
    navigate("/");
    toast.success("Logout");
  };

  return (
    <CDBSidebar
      textColor="black"
      backgroundColor="gray-800"
      className="w-64 bg-slate-500 h-screen"
    >
      <CDBSidebarHeader prefix={<i className="fa fa-bars fa-lg"></i>}>
        <NavLink
          to="/adminpage"
          className="text-lg font-bold text-black"
          activeClassName="text-orange-500"
        >
          Admin
        </NavLink>
      </CDBSidebarHeader>

      <CDBSidebarContent>
        <CDBSidebarMenu>
          <NavLink exact to="/admin/users">
            <CDBSidebarMenuItem icon="users">Users</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/admin/adminorder">
            <CDBSidebarMenuItem icon="store">Orders</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/admin/viewproperty">
            <CDBSidebarMenuItem icon="list">Admin Product</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/admin/properties">
            <CDBSidebarMenuItem icon="plus">Add Product</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/admin/home">
            <CDBSidebarMenuItem icon="user">Admin Home</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/admin/categories">
            <CDBSidebarMenuItem icon="folder">Categories</CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/" onClick={handleLogout}>
            <CDBSidebarMenuItem icon="backward">Exit</CDBSidebarMenuItem>
          </NavLink>
        </CDBSidebarMenu>
      </CDBSidebarContent>
    </CDBSidebar>
  );
};

export default SideBar;
