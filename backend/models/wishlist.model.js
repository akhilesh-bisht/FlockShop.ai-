import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now },
    reactions: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        emoji: { type: String },
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "ProductItem" },
      },
    ],
  },
  { timestamps: true }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;
