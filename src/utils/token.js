import config from "../config/config.js";
import jwt from "jsonwebtoken";

export const createToken = (userId, email, userType) => {
  const token = jwt.sign({ userId, email, userType }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRATION,
  });

  return token;
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (error) {
    throw error;
  }
};
