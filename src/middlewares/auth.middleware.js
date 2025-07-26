import { ResponseHandler } from "../utils/response-handler.js";
import { verifyToken } from "../utils/token.js";

export const protectedRoutes = async (req, res, next) => {
  try {
    const bearer = req.header("Authorization");

    if (!bearer || !bearer.startsWith("Bearer ")) {
      return ResponseHandler.send(
        res,
        false,
        "Access denied. No token provided.",
        401
      );
    }

    const token = bearer.split("Bearer ")[1].trim();

    let decoded;

    try {
      decoded = verifyToken(token);
    } catch (error) {
      return ResponseHandler.send(
        res,
        false,
        "Invalid authorization token",
        401
      );
    }

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      userType: decoded.userType,
    };

    next();
  } catch (error) {
    return ResponseHandler.send(res, false, error.message, 500);
  }
};
