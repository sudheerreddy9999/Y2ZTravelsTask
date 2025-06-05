"use client";

import React from "react";
import GoogleMapComponent from "./GoogleMapComponent";
import { FiX } from "react-icons/fi";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  placeName: string;
  apiKey: string;
};

export default function MobileMapOverlay({ isOpen, onClose, placeName, apiKey }: Props) {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 rounded-t-xl transform transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-y-0" : "translate-y-full"} sm:hidden h-[70vh]`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">{placeName}</h2>
        <FiX className="w-5 h-5 cursor-pointer" onClick={onClose} />
      </div>
      <div className="h-full">
        <GoogleMapComponent apiKey={apiKey} placeName={placeName} />
      </div>
    </div>
  );
}
