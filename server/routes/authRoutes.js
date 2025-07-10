const express = require("express");
const router = express.Router();
const { register, login,logout } = require("../controllers/authController");
const protect = require("../middlewares/authMiddleware");


 
router.get("/me", protect, (req, res) => {
    res.status(200).json(req.user);
  });

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
