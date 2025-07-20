import express from "express";
import { registerUser } from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/register", registerUser);

export default authRouter;
