const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const aiRoutes = require("./routes/ai");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "https://finance-tracker-166mdtcx3-manas-projects-2d084ffe.vercel.app",
  "https://finance-tracker-1l1vk589q-manas-projects-2d084ffe.vercel.app",
  "https://finance-tracker-limryfkah-manas-projects-2d084ffe.vercel.app",
  "https://finance-tracker-git-main-manas-projects-2d084ffe.vercel.app",
  "https://finance-tracker-f8wku1614-manas-projects-2d084ffe.vercel.app",
  "https://finance-tracker-manas-projects-2d084ffe.vercel.app", 
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
};

// ✅ CORS Middleware
app.use(cors(corsOptions));

// ✅ Preflight handler
app.options("*", cors(corsOptions));

// ✅ Manual fallback headers — helps Render issues
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Other middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/ai", aiRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("🚀 API is working...");
});

// DB connection + server start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`✅ Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
