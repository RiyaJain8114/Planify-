require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

// Import routes
const eventRoutes = require("./routes/eventRoutes");
const societyRoutes = require("./routes/societyRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const policyRoutes = require("./routes/policyRoutes");
// const approvalRoutes = require("./routes/approvalRoutes");
// const chatbotRoutes = require("./routes/chatbotRoutes");
// const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();

// ✅ Use CORS middleware properly
const corsOptions = {
  origin: "http://localhost:3000", // your frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Connect to MongoDB
connectDB();

// ✅ Mount routes
app.use("/api/event", eventRoutes);
app.use("/api/societies", societyRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/resource", resourceRoutes);

// app.use("/api/approval", approvalRoutes);
// app.use("/api/chat", chatbotRoutes);
// app.use("/api/analytics", analyticsRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

