"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  PencilIcon,
  PlusIcon,
  SaveIcon,
  XIcon,
} from "@heroicons/react/outline";
import { wishlistApi, productApi } from "../api/api";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import CollaboratorInput from "../components/CollaboratorInput";

const WishlistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    //    // Fetch wishlist and products by ID
    const fetchWishlistData = async () => {
      try {
        setLoading(true);

        const rawWishlist = await wishlistApi.getWishlistById(id);
        const normalizedWishlist = { ...rawWishlist, id: rawWishlist._id };
        setWishlist(normalizedWishlist);
        setNewTitle(normalizedWishlist.title);

        const rawProducts = await productApi.getProductsByWishlistId(id);
        const normalizedProducts = rawProducts.map((p) => ({
          ...p,
          id: p._id,
        }));
        setProducts(normalizedProducts);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load wishlist.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistData();
  }, [id]);

  // Handle title update
  const handleUpdateTitle = async () => {
    if (!newTitle.trim() || newTitle === wishlist.title) {
      setIsEditingTitle(false);
      return;
    }

    try {
      await wishlistApi.updateWishlistTitle(id, newTitle);
      setWishlist({ ...wishlist, title: newTitle });
      setIsEditingTitle(false);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update title.");
    }
  };

  //  add product

  const handleProductSubmit = async (productData) => {
    try {
      const productPayload = {
        ...productData,
        wishlistId: id,
      };

      if (editingProduct) {
        const updatedProduct = await productApi.updateProduct(
          editingProduct.id,
          productPayload
        );
        setProducts((prev) =>
          prev.map((p) =>
            p.id === editingProduct.id
              ? { ...updatedProduct, id: updatedProduct._id }
              : p
          )
        );
        setEditingProduct(null);
      } else {
        const newProduct = await productApi.addProduct(productPayload);
        setProducts((prev) => [...prev, { ...newProduct, id: newProduct._id }]);
        setShowAddProductForm(false);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save product.");
    }
  };
  //  delete product
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await productApi.deleteProduct(productId);
      setProducts(products.filter((p) => p.id !== productId));
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete product.");
    }
  };

  //  edit product

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowAddProductForm(false);
  };

  //  add collaborator
  const handleAddCollaborator = async (wishlistId, userId) => {
    const response = await wishlistApi.addCollaborator(wishlistId, userId);
    setWishlist({
      ...wishlist,
      collaborators: [...(wishlist.collaborators || []), response.collaborator],
    });
    return response;
  };
  //   remove collaborator
  const handleRemoveCollaborator = async (productId, userId) => {
    await wishlistApi.removeCollaborator(productId, userId);
    setWishlist({
      ...wishlist,
      collaborators: (wishlist.collaborators || []).filter(
        (c) => c.id !== userId
      ),
    });
  };

  if (loading && !wishlist) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="animate-pulse text-gray-500">Loading wishlist...</p>
      </div>
    );
  }

  if (!wishlist) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500">Wishlist not found</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="mb-8 flex items-center justify-between">
        {isEditingTitle ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="text-2xl font-bold border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              autoFocus
            />
            <button
              onClick={handleUpdateTitle}
              className="p-1 text-gray-500 hover:text-indigo-600"
            >
              <SaveIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => {
                setNewTitle(wishlist.title);
                setIsEditingTitle(false);
              }}
              className="p-1 text-gray-500 hover:text-red-500"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 mr-2">
              {wishlist.title}
            </h1>
            <button
              onClick={() => setIsEditingTitle(true)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
          </div>
        )}
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Products</h2>
            {!loading && !showAddProductForm && !editingProduct && (
              <button
                onClick={() => {
                  setShowAddProductForm(true);
                  setEditingProduct(null);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <PlusIcon className="h-5 w-5 mr-1" /> Add Product
              </button>
            )}
          </div>

          {(showAddProductForm || editingProduct) && (
            <div className="mb-8">
              <ProductForm
                product={editingProduct}
                onSubmit={handleProductSubmit}
                onCancel={() => {
                  setShowAddProductForm(false);
                  setEditingProduct(null);
                }}
              />
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-400 animate-pulse">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-4">
                No products in this wishlist yet
              </p>
              {!showAddProductForm && !editingProduct && (
                <button
                  onClick={() => {
                    setShowAddProductForm(true);
                    setEditingProduct(null);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <PlusIcon className="h-5 w-5 mr-1" /> Add your first product
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                />
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <CollaboratorInput
            products={products}
            wishlistId={id}
            collaborators={wishlist.collaborators || []}
            onAddCollaborator={handleAddCollaborator}
            onRemoveCollaborator={handleRemoveCollaborator}
          />
        </div>
      </div>
    </div>
  );
};

export default WishlistDetail;
