import mongoose from "mongoose";

const productItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String },
    price: { type: Number, required: true },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    wishlist: { type: mongoose.Schema.Types.ObjectId, ref: "Wishlist" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const ProductItem = mongoose.model("ProductItem", productItemSchema);
export default ProductItem;
