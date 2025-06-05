"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { FaEquals } from "react-icons/fa6";
import { CSS } from "@dnd-kit/utilities";

import MapIcon from "../../../assets/icons/google-maps.png";
import deleteIcon from "../../../assets/icons/delete.png";
import star from "../../../assets/icons/star.png";
import Pencil from "../../../assets/icons/pencil.png";
import indiaGate from "../../../assets/icons/IndiaGate.jpg";
import redfort from "../../../assets/icons/redfort.jpg";
import qutubminar from "../../../assets/icons/qutubminar.jpg";
import lotusTemple from "../../../assets/icons/lotusTemple.jpg"
import { FaFileWord, FaFilePdf, FaFileAlt } from "react-icons/fa";
import { FiX } from "react-icons/fi";

import Image from "../Image/Image";
import EditDescriptionModal from "../Modals/EditModal";
import FileUploader from "../FileUpload/FileUploader";

import type { StaticImageData } from "next/image";

type Place = {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  description: string;
  image: keyof typeof imageMap;
  actions: {
    location: boolean;
    pin: boolean;
    edit: boolean;
    delete: boolean;
  };
  tag?: string;
};

type ItemProps = {
  id: number;
  place: Place;
  onMapClick: () => void;
  onDelete: () => void;
  isSelected: boolean;
  onUpdateDescription: (id: number, newDesc: string) => void;
};

const imageMap: Record<string, StaticImageData> = {
  indiaGate,
  redfort,
  qutubminar,
  lotusTemple
};

export default function SortableItem({
  id,
  place,
  onMapClick,
  onDelete,
  isSelected,
  onUpdateDescription,
}: ItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [description, setDescription] = React.useState(place.description);
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);

  const handleMapClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    console.log("Map Icon Clicked");
    onMapClick();
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Pencil icon clicked");
    setIsModalOpen(true);
  };

  const handleDeleteClick = () => {
    console.log("Delete icon clicked");
    onDelete();
  };

  const getFileIcon = (name: string) => {
    const ext = name.split(".").pop()?.toLowerCase();
    if (ext === "doc" || ext === "docx")
      return <FaFileWord className="text-blue-600 w-5 h-5" />;
    if (ext === "pdf") return <FaFilePdf className="text-red-600 w-5 h-5" />;
    return <FaFileAlt className="text-gray-500 w-5 h-5" />;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`mb-3 rounded-md p-2 transition-all flex justify-center items-center space-x-2.5 ${
        isSelected ? "border-2 border-gray-500 shadow-md" : ""
      }`}
    >
      <div
        className="flex items-center justify-center space-x-2 cursor-grab"
        {...attributes}
        {...listeners}
      >
        <FaEquals className="text-gray-600" size={16} />
        <Image
          src={imageMap[place.image] ?? indiaGate}
          alt={place.name}
          className="h-24 w-20 sm:w-24 sm:h-28 rounded-md object-cover"
        />
      </div>
      <div className="flex-1 space-y-2 px-2">
        <div className="flex items-center justify-between space-x-2">
          <h1 className="text-xs sm:text-[15px] font-[600]">{place.name}</h1>
          <div className="flex items-center space-x-6 px-3">
            {place.actions.location && (
              <Image
                src={MapIcon}
                alt="Map Icon"
                className="w-4 h-4 cursor-pointer hover:-translate-y-1"
                onClick={handleMapClick}
              />
            )}
            {place.actions.pin && (
              <FileUploader
                onFileSelect={(file) => {
                  console.log("Uploaded file:", file);
                  setUploadedFile(file);
                }}
              />
            )}

            {place.actions.delete && (
              <Image
                src={deleteIcon}
                alt="Delete Icon"
                onClick={handleDeleteClick}
                className="w-4 h-4 cursor-pointer"
              />
            )}
          </div>
        </div>

        <div className="flex items-center space-x-1.5 text-sm text-gray-500">
          <p>{place.rating}</p>
          <Image
            src={star}
            alt="Star Icon"
            className="w-3 h-3 -translate-y-0.5"
          />
          <p>({place.reviews.toLocaleString()})</p>
        </div>

        <div className="flex items-center justify-between rounded-md bg-gray-100 p-1.5 space-x-2">
          <p className="text-[12.5px] block md:hidden" onClick={handleMapClick}>
            {place.description.slice(0, 50)}
            {place.description.length > 20 ? "..." : ""}
          </p>
          <p className="text-[12.5px] hidden md:block" onClick={handleMapClick}>
            {place.description}
          </p>
          <Image
            src={Pencil}
            alt="Edit Icon"
            className="w-4 h-4 cursor-pointer hover:-translate-y-1"
            onClick={handleEditClick}
          />
        </div>
        {uploadedFile && (
          <div className="flex items-center mt-2 space-x-2 bg-white border rounded-md px-2 py-1 w-fit shadow-sm">
            {getFileIcon(uploadedFile.name)}
            <p className="text-xs truncate max-w-[100px]">
              {uploadedFile.name}
            </p>
            <FiX
              className="text-gray-500 w-3 h-3 cursor-pointer"
              onClick={() => setUploadedFile(null)}
            />
          </div>
        )}
      </div>

      <EditDescriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        description={description}
        onSave={(newDesc) => {
          setDescription(newDesc);
          onUpdateDescription(id, newDesc);
        }}
      />
    </div>
  );
}
