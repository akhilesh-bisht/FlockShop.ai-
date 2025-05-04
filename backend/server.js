import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import productRoutes from "./routes/productItemRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

// MongoDB connection
connectDB();

// Routes

//  authentication routes
app.use("/api/auth", userRoute);
// wishlist routes

app.use("/api/wishlists", wishlistRoutes);
//  product item routes

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Server is running with import syntax!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
