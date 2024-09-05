import React from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useQuery } from "@tanstack/react-query";

  //fuction for fecth data
const fetchCOVIDData = async () => {
  const { data } = await axios.get("https://disease.sh/v3/covid-19/historical/all?lastdays=30");
  // Format data for recharts
  return Object.keys(data.cases).map((date) => ({
    date,
    cases: data.cases[date],
  }));
};

const CovidLineGraph = () => {
  // UseQuery for fetching the data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["covidData"], 
    queryFn: fetchCOVIDData
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : "An error occurred"}</div>;
  }

  return (
    <div className="w-full h-96 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-center text-2xl font-semibold mb-4 text-gray-800">
        COVID-19 Case Fluctuations (Last 30 Days)
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} className="p-2">
          <defs>
            <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="date" stroke="#555555" />
          <YAxis stroke="#555555" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#2c2c2c",
              border: "none",
              borderRadius: "5px",
              color: "#fff",
            }}
            labelStyle={{ color: "#8884d8" }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="cases"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorCases)"
            strokeWidth={3}
            dot={{ stroke: "#8884d8", strokeWidth: 2, fill: "#fff" }}
            activeDot={{ r: 8 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CovidLineGraph;
