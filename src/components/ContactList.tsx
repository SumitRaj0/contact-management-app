import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, submitFormData } from "../store/slices/contactSlice";
import { IContact } from "../Interfae/Interfaces";
import ContactModal from "./ContactModal"; // Import the modal
import { Bounce, toast } from "react-toastify";

const ContactList = () => {
  const contacts = useSelector((state: any) => state.contact.contactList);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [currentRowId, setCurrentRowId] = useState<string | null>(null);
  const [editedContact, setEditedContact] = useState<IContact | null>(null);
  const [selectedContact, setSelectedContact] = useState<IContact | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEditClick = (contact: IContact) => {
    setIsEditing(true);
    setCurrentRowId(contact.id);
    setEditedContact({ ...contact });
    
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof IContact
  ) => {
    if (editedContact) {
      setEditedContact({ ...editedContact, [field]: e.target.value });
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedContact) {
      setEditedContact({
        ...editedContact,
        status: e.target.value as IContact["status"],
      });
    }
  };

  const handleDelete = (id: string) => {
    dispatch(removeItem(id));
    toast.success('Contact deleted successfully!', {  
      position: "top-right",  
      autoClose: 5000,  
      hideProgressBar: false,  
      closeOnClick: true,  
      pauseOnHover: true,  
      draggable: true,  
      progress: undefined,  
      theme: "colored",  
      transition: Bounce,  
    }); 
      
  };

  const handleView = (contact: IContact) => {
    setSelectedContact(contact);
    setIsModalVisible(true); // Show modal when view button is clicked
  };

  const handleSaveClick = () => {
    if (editedContact) {
      dispatch(submitFormData(editedContact));
    }
    setIsEditing(false);
    setCurrentRowId(null);
    setEditedContact(null);
    toast.success('Contact updated successfully!', {
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
    <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Contact List</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b-2 py-2 text-left">Name</th>
            <th className="border-b-2 py-2 text-left">Number</th>
            <th className="border-b-2 py-2 text-left">Status</th>
            <th className="border-b-2 py-2 text-left">Edit</th>
            <th className="border-b-2 py-2 text-left">Delete</th>
            <th className="border-b-2 py-2 text-left">View</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact: IContact) => (
            <tr
              key={contact.id}
              className="hover:shadow-md hover:shadow-blue-600"
            >
              <td className="border-b py-2">
                {isEditing && currentRowId === contact.id ? (
                  <input
                    type="text"
                    value={editedContact?.name || ""}
                    onChange={(e) => handleInputChange(e, "name")}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  />
                ) : (
                  contact.name
                )}
              </td>
              <td className="border-b py-2">
                {isEditing && currentRowId === contact.id ? (
                  <input
                    type="text"
                    value={editedContact?.mobileNumber || ""}
                    onChange={(e) => handleInputChange(e, "mobileNumber")}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  />
                ) : (
                  contact.mobileNumber
                )}
              </td>
              <td className="border-b py-2">
                {isEditing && currentRowId === contact.id ? (
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="Active"
                        checked={editedContact?.status === "Active"}
                        onChange={handleStatusChange}
                        className="mr-2"
                      />
                      Active
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="Inactive"
                        checked={editedContact?.status === "Inactive"}
                        onChange={handleStatusChange}
                        className="mr-2"
                      />
                      Inactive
                    </label>
                  </div>
                ) : (
                  contact.status
                )}
              </td>
              <td className="border-b py-2">
                {isEditing && currentRowId === contact.id ? (
                  <button
                    onClick={handleSaveClick}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(contact)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                )}
              </td>
              <td className="border-b py-2">
                <button
                  type="button"
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(contact.id)}
                >
                  Delete
                </button>
              </td>
              <td className="border-b py-2">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => handleView(contact)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* // view modal */}
      <ContactModal
        contact={selectedContact}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </div>
  );
};

export default ContactList;
