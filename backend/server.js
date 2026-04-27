import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// ✅ CORS fix
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// middleware
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

// connect DB then start server
connectDB().then(() => {
  app.listen(process.env.PORT || 5003, () => {
    console.log(`🚀 Server running on port ${process.env.PORT || 5003}`);
  });
});