const express = require("express");
const router = express.Router();

const { getSmartInsights } = require("../controllers/aiController");
const protect = require("../middlewares/authMiddleware")

router.post("/smart-insights", protect, getSmartInsights);


module.exports = router;
