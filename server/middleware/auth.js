import jwt from "jsonwebtoken";
import User from "../model/user_model.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded.id) {
        return res.status(401).json({ message: "Invalid token payload" });
      }
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
          return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
        }
        
        req.user = user;
      return next();
    } catch (error) {
      console.error("Token verification failed:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  return res.status(401).json({ message: "Not authorized, no token" });
};
