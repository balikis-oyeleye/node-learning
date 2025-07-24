import { ResponseHandler } from "../utils/response-handler.js";
import { verifyToken } from "../utils/token.js";

export const protectedRoutes = async (req, res, next) => {
  try {
    const bearer = req.header("x-auth-token");

    if (!token || !bearer.startsWith("Bearer ")) {
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
      return ResponseHandler.send(res, false, "Invalid token format", 400);
    }

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    };

    next();
  } catch (error) {
    return ResponseHandler.send(res, false, "Authentication failed", 500);
  }
};
