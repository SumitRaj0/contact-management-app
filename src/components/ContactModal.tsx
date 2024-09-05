import React from "react";
import { IContact } from "../Interfae/Interfaces";

interface ContactModalProps {
  contact: IContact | null;
  isVisible: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ contact, isVisible, onClose }) => {
  if (!isVisible || !contact) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Contact Details</h2>
        <p><strong>Name:</strong> {contact.name}</p>
        <p><strong>Number:</strong> {contact.mobileNumber}</p>
        <p><strong>Status:</strong> {contact.status}</p>
        <div className="mt-4 text-right">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
