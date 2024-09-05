import React from "react";
import CovidLineGraph from "./CovidLineGraph";
import CovidMap from "./CovidMap";

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        COVID-19 Dashboard
      </h1>
      <CovidLineGraph />
      <CovidMap />
    </div>
  );
};

export default Dashboard;
