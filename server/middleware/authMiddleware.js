import jwt from "jsonwebtoken";

// Middleware to protect routes (any logged-in user)
export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  //check if token exists and starts with bearer
  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};

// Middleware to restrict route access to admin users only
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // Allow access
  } else {
    res.status(403).json({ message: "Access denied, admin only" });
  }
};
