import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ContactList from "./ContactList";

const Contact = () => {
  const navigate = useNavigate();

  const handleCreateContact = () => {
    navigate("/form");
  };
 
  return (
    <div className="p-4">
      <button
        type="button"
        className="cursor-pointer bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 float-right"
        onClick={handleCreateContact}
      >
        Create Contact
      </button>

      {/* Display the contact list when not in /contact/form */}
      <div className="clear-both pt-1">
        <Outlet/>
      </div>
    </div>
  );
};

export default Contact;
