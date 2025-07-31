import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/config/db.js";
import fileRoutes from "./src/routes/fileRoutes.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads folder statically (optional, for file access)
app.use("/uploads", express.static("uploads"));

// Mount your API routes
app.use("/api", fileRoutes);

// 404 handler (must be after all routes)
app.use((req, res) => {
  res.status(404).send("Not found");
});

// Connect to DB, then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
  });