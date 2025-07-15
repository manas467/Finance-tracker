const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const transactionRoutes = require("./routes/transactionRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//const allowedOrigins = [
 //"https://finance-tracker-166mdtcx3-manas-projects-2d084ffe.vercel.app",
 //"https://finance-tracker-1l1vk589q-manas-projects-2d084ffe.vercel.app",
 // "https://finance-tracker-limryfkah-manas-projects-2d084ffe.vercel.app",
  //"https://finance-tracker-git-main-manas-projects-2d084ffe.vercel.app",
   //"https://finance-tracker-f8wku1614-manas-projects-2d084ffe.vercel.app",
   //"https://finance-tracker-qspaqgcog-manas-projects-2d084ffe.vercel.app"

//];

app.use(cors({
  origin: function (origin, callback) {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      /\.vercel\.app$/.test(origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));



app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/ai", require("./routes/ai"));


app.get("/", (req, res) => {
  res.send("🚀 API is working...");
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));


