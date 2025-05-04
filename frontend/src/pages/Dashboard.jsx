"use client";

import { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/outline";
import { wishlistApi } from "../api/api";
import WishlistCard from "../components/WishlistCard";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newWishlistTitle, setNewWishlistTitle] = useState("");

  const { user } = useAuth();
  console.log(wishlists);

  // Fetch all wishlists on component mount
  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        setLoading(true);
        const data = await wishlistApi.getAllWishlists();
        setWishlists(data);
      } catch (err) {
        setError("Failed to load wishlists. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlists();
  }, []);

  const handleCreateWishlist = async (e) => {
    e.preventDefault();

    if (!newWishlistTitle.trim()) {
      return;
    }

    try {
      const newWishlist = await wishlistApi.createWishlist({
        title: newWishlistTitle,
      });
      setWishlists([...wishlists, newWishlist]);
      setNewWishlistTitle("");
      setShowCreateForm(false);
    } catch (err) {
      setError("Failed to create wishlist. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Wishlists</h1>

        <button
          onClick={() => setShowCreateForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          New Wishlist
        </button>
      </div>

      {error && (
        <div
          className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Create wishlist form */}
      {showCreateForm && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Create New Wishlist
          </h2>

          <form onSubmit={handleCreateWishlist}>
            <div className="flex space-x-3">
              <input
                type="text"
                value={newWishlistTitle}
                onChange={(e) => setNewWishlistTitle(e.target.value)}
                placeholder="Wishlist title"
                className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />

              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create
              </button>

              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Wishlists grid */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading wishlists...</p>
        </div>
      ) : wishlists.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">You don't have any wishlists yet</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="h-5 w-5 mr-1" />
            Create your first wishlist
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlists.map((wishlist) => (
            <WishlistCard
              key={wishlist._id}
              id={wishlist._id}
              wishlist={wishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
