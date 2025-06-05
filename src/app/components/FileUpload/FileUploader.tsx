// components/FileUploader.tsx
"use client";

import React, { useRef } from "react";
import { FiPaperclip } from "react-icons/fi";

type Props = {
  onFileSelect: (file: File) => void;
};

export default function FileUploader({ onFileSelect }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  return (
    <>
      <FiPaperclip
        className="cursor-pointer hover:-translate-y-1"
        onClick={handleIconClick}
      />
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.jpg,.png"
      />
    </>
  );
}
