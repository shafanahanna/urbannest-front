import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SideBar from "./sidebar";
import interceptor from "../../axios/admininterceptor";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

function Category() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await interceptor.get("/api/admin/categories");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch categories");
    }
  };

  const handleAdd = async () => {
    if (!newCategory) {
      toast.error("Category name cannot be empty");
      return;
    }

    try {
      const response = await interceptor.post("/api/admin/categories", {
        category: newCategory,
      });
      if (response.status === 201) {
        toast.success("Category added successfully");
        setNewCategory("");
        fetchCategories();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add category");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await interceptor.delete(`/api/admin/categories/${id}`);
      if (response.status === 200) {
        toast.success("Category deleted successfully");
        fetchCategories();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete category");
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await interceptor.put(`/api/admin/categories/${id}`, {
        category: editCategoryName,
      });
      if (response.status === 200) {
        toast.success("Category updated successfully");
        setEditCategoryId(null);
        setEditCategoryName("");
        fetchCategories();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update category");
    }
  };

  const handleEdit = (category) => {
    setEditCategoryId(category._id);
    setEditCategoryName(category.category);
  };

  const handleCancelEdit = () => {
    setEditCategoryId(null);
    setEditCategoryName("");
  };

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex flex-col items-center justify-center w-full p-6">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Category Management
        </h2>
        <div className="flex mb-6 w-3/4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter new category name"
            className="px-4 py-2 border border-gray-300 rounded-l focus:outline-none w-full"
          />
          <button
            onClick={handleAdd}
            className="px-6 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none flex items-center"
          >
            <FaPlus className="mr-2" />
            Add Category
          </button>
        </div>
        <div className="w-3/4">
          {categories.map((category) => (
            <div
              key={category._id}
              className="flex justify-between items-center mb-4 p-4 border border-gray-300 rounded"
            >
              {editCategoryId === category._id ? (
                <>
                  <input
                    type="text"
                    value={editCategoryName}
                    onChange={(e) => setEditCategoryName(e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded-l focus:outline-none w-full"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdate(category._id)}
                      className="px-4 py-1 bg-green-500 text-white rounded-r hover:bg-green-600 focus:outline-none flex items-center"
                    >
                      <FaSave className="mr-2" />
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none flex items-center"
                    >
                      <FaTimes className="mr-2" />
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className="flex-1">{category.category}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="px-4 py-1 bg-yellow-500 text-white rounded-l hover:bg-yellow-600 focus:outline-none flex items-center"
                    >
                      <FaEdit className="mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="px-4 py-1 bg-red-500 text-white rounded-r hover:bg-red-600 focus:outline-none flex items-center"
                    >
                      <FaTrash className="mr-2" />
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Category;
