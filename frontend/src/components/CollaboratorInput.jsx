"use client";

import { useState } from "react";
import { PlusIcon, XIcon } from "@heroicons/react/outline";

const CollaboratorInput = ({
  wishlistId,
  collaborators = [],
  onAddCollaborator,
  onRemoveCollaborator,
}) => {
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  const handleAddCollaborator = async () => {
    if (!userId.trim()) {
      setError("Please enter a user ID");
      return;
    }

    try {
      setError("");
      await onAddCollaborator(wishlistId, userId);
      setUserId(""); // Clear input after successful add
    } catch (err) {
      setError(err.message || "Failed to add collaborator");
    }
  };

  const handleRemoveCollaborator = async (collaboratorId) => {
    try {
      await onRemoveCollaborator(wishlistId, collaboratorId);
    } catch (err) {
      setError(err.message || "Failed to remove collaborator");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Collaborators
      </h2>

      {error && (
        <div
          className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="flex space-x-2 mb-6">
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter user ID"
          className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />

        <button
          onClick={handleAddCollaborator}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Add
        </button>
      </div>

      {/* List of collaborators */}
      <div className="space-y-3">
        {collaborators.length === 0 ? (
          <p className="text-sm text-gray-500">No collaborators yet</p>
        ) : (
          collaborators.map((collaborator) => (
            <div
              key={collaborator._id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
            >
              <div>
                <p className="font-medium text-gray-900">
                  {collaborator.email || "Unknown User"}
                </p>
                <p className="text-sm text-gray-500">
                  {collaborator.email || collaborator.id}
                </p>
              </div>

              <button
                onClick={() => handleRemoveCollaborator(collaborator._id)}
                className="p-1 text-gray-400 hover:text-red-500"
                title="Remove collaborator"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CollaboratorInput;
