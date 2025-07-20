import { ResponseHandler } from "../utils/response-handler";
import { verifyToken } from "../utils/token";

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");

    if (!token) {
      return ResponseHandler.send(
        res,
        false,
        "Access denied. No token provided.",
        401
      );
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return ResponseHandler.send(res, false, "Invalid or expired token", 401);
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
