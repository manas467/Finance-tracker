const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json("Not authenticated");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user to req object
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    console.error(err);
    res.status(403).json("Invalid or expired token");
  }
};

module.exports = protect;
