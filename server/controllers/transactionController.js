const Transaction = require("../models/Transaction");

// Create new transaction
exports.createTransaction = async (req, res) => {
  try {
    const { type, amount, category, description, date } = req.body;

    const newTx = new Transaction({
      user: req.user._id,
      type,
      amount,
      category,
      description,
      date,
    });

    await newTx.save();
    res.status(201).json(newTx);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
};

// Get all transactions for the logged-in user
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort({
      date: -1,
    });
    res.status(200).json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
};

// Delete a transaction by ID
exports.deleteTransaction = async (req, res) => {
    try {
      const tx = await Transaction.findById(req.params.id);
  
      if (!tx) return res.status(404).json("Transaction not found");
  
      if (tx.user.toString() !== req.user._id.toString()) {
        return res.status(403).json("Unauthorized");
      }
  
      await Transaction.findByIdAndDelete(req.params.id); // ✅ FIXED LINE
      res.status(200).json("Deleted successfully");
    } catch (err) {
      console.error("Error deleting transaction:", err.message);
      res.status(500).json("Server error: " + err.message);
    }
  };
  
