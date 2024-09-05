import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const handleContact = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white py-6 shadow-md">
        <div className="container mx-auto flex justify-center items-center px-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
            Contact Management App
          </h1>
        </div>
      </header>
      <div className="flex flex-1">
        <nav className="bg-blue-600 min-h-full w-60 p-4">
          <ul className="text-white text-lg font-medium space-y-2">
            <li
              className={`py-3 px-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${
                location.pathname === "/" ? "bg-blue-700 border-l-4 border-blue-300" : "hover:bg-blue-700"
              }`}
              onClick={handleContact}
            >
              Contacts
            </li>
            <li
              className={`py-3 px-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${
                location.pathname === "/dashboard" ? "bg-blue-700 border-l-4 border-blue-300" : "hover:bg-blue-700"
              }`}
              onClick={handleDashboard}
            >
              Dashboard
            </li>
          </ul>
        </nav>
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Home;
