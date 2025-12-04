import jwt from "jsonwebtoken";
import FoodPartner from "../models/foodpartner.model.js";

const secret = process.env.JWT_SECRET;

export async function authFoodPartner(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const foodPartner = await FoodPartner.findById(decoded.id);

    if (!foodPartner) {
      return res.status(401).json({
        message: "Unauthorized: User not found",
      });
    }

    req.foodPartner = foodPartner; // attach to req object

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized: Invalid token",
      error: error.message,
    });
  }
}
