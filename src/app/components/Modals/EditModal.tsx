"use client";

import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  description: string;
  onSave: (newDesc: string) => void;
};

export default function EditDescriptionModal({
  isOpen,
  onClose,
  description,
  onSave,
}: Props) {
  const [newDesc, setNewDesc] = React.useState(description);

  if (!isOpen) return null;

  console.log("EditDescriptionModal rendered", isOpen,
  description,
  );

  return (
          <div className="fixed inset-0 w-full bg-opacity-90 flex items-center justify-center z-50">
        <div className="flex flex-col justify-center w-[40%] h-4/12 rounded-md shadow-2xl bg-white items-center p-10">
        <h2 className="text-xl font-bold mb-4">Edit Description</h2>
        <textarea
          className="w-full h-24 border rounded p-2 text-sm"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
        />
        <div className="mt-4 flex justify-end gap-3">
          <button
            className="bg-gray-300 px-4 py-1 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded"
            onClick={() => {
              onSave(newDesc);
              onClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
