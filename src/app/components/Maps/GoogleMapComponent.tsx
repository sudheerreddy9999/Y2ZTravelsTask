// components/GoogleMapComponent.tsx
"use client";

import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

type Props = {
  placeName: string;
  apiKey: string;
};

const locationMap: Record<string, { lat: number; lng: number }> = {
  "India Gate": { lat: 28.6129, lng: 77.2295 },
  // Add more known places as needed
};

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const GoogleMapComponent: React.FC<Props> = ({ placeName, apiKey }) => {
  const position = locationMap[placeName] || { lat: 20.5937, lng: 78.9629 }; 

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={14}
      >
        <Marker position={position} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
