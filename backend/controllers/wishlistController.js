import Wishlist from "../models/wishlist.model.js";
// import User from "../models/User.js";

// 1. Create a new wishlist
export const createWishlist = async (req, res) => {
  try {
    const { title, userId } = req.body;

    const newWishlist = new Wishlist({
      title,
      createdBy: userId,
      collaborators: [userId],
    });

    await newWishlist.save();
    res.status(201).json(newWishlist);
  } catch (error) {
    res.status(500).json({ message: "Error creating wishlist", error });
  }
};

// 2. Get all wishlists for a user
export const getWishlistsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlists = await Wishlist.find({
      collaborators: userId,
    }).populate("createdBy", "name email");

    res.status(200).json(wishlists);
  } catch (error) {
    res.status(500).json({ message: "Error fetching wishlists", error });
  }
};

// 3. Get single wishlist by ID
export const getWishlistById = async (req, res) => {
  try {
    const { id } = req.params;

    const wishlist = await Wishlist.findById(id)
      .populate("createdBy", "name email")
      .populate("collaborators", "name email");

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Error fetching wishlist", error });
  }
};

// 4. Update wishlist title
export const updateWishlistTitle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const updated = await Wishlist.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating title", error });
  }
};

// 5. Add a collaborator
export const addCollaborator = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const wishlist = await Wishlist.findById(id);

    if (!wishlist.collaborators.includes(userId)) {
      wishlist.collaborators.push(userId);
      await wishlist.save();
    }

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Error adding collaborator", error });
  }
};

// 6. Remove a collaborator
export const removeCollaborator = async (req, res) => {
  try {
    const { id } = req.params; // wishlistId
    const { userId } = req.body;

    const wishlist = await Wishlist.findById(id);

    wishlist.collaborators = wishlist.collaborators.filter(
      (uid) => uid.toString() !== userId
    );

    await wishlist.save();

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Error removing collaborator", error });
  }
};

// 7. Delete wishlist
export const deleteWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    await Wishlist.findByIdAndDelete(id);

    res.status(200).json({ message: "Wishlist deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting wishlist", error });
  }
};
