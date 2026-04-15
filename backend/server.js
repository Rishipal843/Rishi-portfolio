import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config(); 
const app = express();

// Access environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors({
  origin: ["https://rishi-portfolio-frontend.onrender.com"],
  methods: ["GET", "POST"],
}));
app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);

// MongoDB connection
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error(err));

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
