import ProductItem from "../models/ProductItem.js";

// Create a product item
export const createProductItem = async (req, res) => {
  try {
    const { name, imageUrl, price, wishlistId, addedBy } = req.body;

    const newItem = await ProductItem.create({
      name,
      imageUrl,
      price,
      wishlist: wishlistId,
      addedBy,
      updatedBy: addedBy,
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to create product item", error });
  }
};

// Get all items for a wishlist
export const getProductItemsByWishlist = async (req, res) => {
  try {
    const { wishlistId } = req.params;
    const items = await ProductItem.find({ wishlist: wishlistId }).populate(
      "addedBy updatedBy"
    );
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product items", error });
  }
};

// Update a product item
export const updateProductItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, imageUrl, price, updatedBy } = req.body;

    const updatedItem = await ProductItem.findByIdAndUpdate(
      id,
      { name, imageUrl, price, updatedBy },
      { new: true }
    );

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating item", error });
  }
};

// Delete a product item
export const deleteProductItem = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductItem.findByIdAndDelete(id);
    res.json({ message: "Product item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error });
  }
};
