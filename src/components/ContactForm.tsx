import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IContact } from "../Interfae/Interfaces";
import { submitFormData } from "../store/slices/contactSlice";
import { Bounce, toast } from "react-toastify";

const ContactForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<IContact>({
    id:Date.now().toString(),
    name: "",
    mobileNumber: "",
    status: "Active",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(submitFormData(formData)); 
    navigate("/"); 
    toast.success('Contact created successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex items-center">
          <label className="w-1/3 text-gray-700 font-semibold">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-2/3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4 flex items-center">
          <label className="w-1/3 text-gray-700 font-semibold">Contact</label>
          <input
            type="number"
            value={formData.mobileNumber}
            onChange={(e) =>
              setFormData({ ...formData, mobileNumber: e.target.value })
            }
            className="w-2/3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4 flex items-center">
          <label className="w-1/3 text-gray-700 font-semibold">Status</label>
          <div className="flex-1 flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                value="Active"
                checked={formData.status === "Active"}
                onChange={(e) => setFormData({ ...formData, status: "Active" })}
                name="status"
                className="mr-2"
              />
              <span className="text-gray-600">Active</span>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="status"
                className="mr-2"
                value="Inactive"
                checked={formData.status === "Inactive"}
                onChange={(e) =>
                  setFormData({ ...formData, status: "Inactive" })
                }
              />
              <span className="text-gray-600">Inactive</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
