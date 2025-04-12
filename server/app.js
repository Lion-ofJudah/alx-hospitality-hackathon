import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./database/db.js";
import userRoutes from "./routes/user_routes.js";
import adminRoutes from "./routes/admin_routes.js"; // 🆕 Import admin routes

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/api/admin", adminRoutes); // 🆕 Mount admin routes
app.use("/api/users", userRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("🚀 Welcome to the Admin API");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
