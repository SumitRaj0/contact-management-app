import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ICountryData } from "../Interfae/Interfaces";



// Custom marker icons based on the number of cases.
const getCustomIcon = (cases: number) => {
  let iconUrl = "https://img.icons8.com/color/48/000000/marker.png"; // Default icon
  if (cases > 1000000) {
    iconUrl = "https://img.icons8.com/color/48/000000/coronavirus.png"; // Red icon for high cases
  } else if (cases > 100000) {
    iconUrl = "https://img.icons8.com/color/48/000000/virus.png"; // Yellow icon for medium cases
  } else {
    iconUrl = "https://img.icons8.com/color/48/000000/safe.png"; // Green icon for low cases
  }
  return new L.Icon({
    iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// React Query fetcher function
const fetchCountriesData = async () => {
  const { data } = await axios.get<ICountryData[]>("https://disease.sh/v3/covid-19/countries");
  return data;
};

const CovidMap = () => {
  const mapRef = useRef<HTMLDivElement>(null); 

  // Using React Query to fetch the data
  const { data: countriesData, isLoading, isError, error } = useQuery<ICountryData[], Error>({
    queryKey: ["countriesData"], 
    queryFn: fetchCountriesData
  });


  const center: LatLngExpression = [20, 0];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : "An error occurred"}</div>;
  }

  return (
    <div className="relative w-full h-96 mt-8" ref={mapRef}>
      <h2 className="text-center text-lg font-semibold mb-4">COVID-19 World Map</h2>
      <MapContainer
        center={center}
        zoom={2}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        className="relative"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {countriesData &&
          countriesData.map((country, index) => (
            <Marker
              key={index}
              position={[country.countryInfo.lat, country.countryInfo.long] as LatLngExpression}
              icon={getCustomIcon(country.cases)}
            >
              <Popup className="text-sm">
                <div className="text-center">
                  <img src={country.countryInfo.flag} alt={country.country} className="w-12 h-8 mb-2 mx-auto" />
                  <strong>{country.country}</strong>
                  <p>Total Cases: {country.cases.toLocaleString()}</p>
                  <p>Total Deaths: {country.deaths.toLocaleString()}</p>
                  <p>Total Recovered: {country.recovered.toLocaleString()}</p>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>

      {/* Fullscreen button */}
      <FullscreenButton mapRef={mapRef} />
    </div>
  );
};

// Fullscreen button component
const FullscreenButton = ({ mapRef }: { mapRef: React.RefObject<HTMLDivElement> }) => {
  const handleFullscreen = () => {
    if (mapRef.current) {
      if (!document.fullscreenElement) {
        mapRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <button
      onClick={handleFullscreen}
      className="absolute top-2 right-2 bg-white p-2 rounded shadow text-sm"
    >
      Fullscreen
    </button>
  );
};

export default CovidMap;
