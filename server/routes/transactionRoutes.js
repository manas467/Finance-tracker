const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const {
  createTransaction,
  getTransactions,
  deleteTransaction,
} = require("../controllers/transactionController");

router.post("/", protect, createTransaction);
router.get("/", protect, getTransactions);
router.delete("/:id", protect, deleteTransaction);

module.exports = router;
