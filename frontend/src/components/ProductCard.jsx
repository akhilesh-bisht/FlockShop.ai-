"use client";

import { useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  ExternalLinkIcon,
} from "@heroicons/react/outline";

const ProductCard = ({ product, onEdit, onDelete }) => {
  const { id, name, description, price, url, imageUrl } = product;
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className="relative bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product image */}
      <div className="h-48 w-full bg-gray-200 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>

      {/* Product details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>

        {price && (
          <p className="text-lg font-bold text-gray-900 mb-2">
            ${Number.parseFloat(price).toFixed(2)}
          </p>
        )}

        {description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {description}
          </p>
        )}

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View product
            <ExternalLinkIcon className="ml-1 h-4 w-4" />
          </a>
        )}
      </div>

      {/* Action buttons */}
      <div
        className={`absolute top-2 right-2 flex space-x-1 transition-opacity duration-200 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={() => onEdit(product)}
          className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
          title="Edit product"
        >
          <PencilIcon className="h-4 w-4 text-gray-600" />
        </button>

        <button
          onClick={() => onDelete(id)}
          className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
          title="Delete product"
        >
          <TrashIcon className="h-4 w-4 text-red-600" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
