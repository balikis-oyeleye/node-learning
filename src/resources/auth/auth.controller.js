import User from "../user/user.model.js";
import { ResponseHandler } from "../../utils/response-handler.js";
import { createToken } from "../../utils/token.js";
import { validateSchema } from "../../utils/validate.js";
import { loginUserSchema, registerUserSchema } from "./auth.schema.js";
import bcrypt from "bcryptjs";
import Instructor from "../instructor/instructor.model.js";
import Student from "../student/student.model.js";

export const registerUser = async (req, res) => {
  const result = validateSchema(registerUserSchema, req.body);

  if (!result.success) {
    return ResponseHandler.send(res, false, result.error, 400);
  }

  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    userType,
    classLevel,
  } = result.data;

  let existingUser = await User.findOne({ email });
  if (existingUser) {
    return ResponseHandler.send(res, false, "User already exists", 409);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    firstName,
    lastName,
    phoneNumber,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  if (userType === "student") {
    await Student.create({
      user: newUser.userId,
      classLevel,
    });
  } else if (userType === "instructor") {
    await Instructor.create({
      user: newUser.userId,
    });
  }

  return ResponseHandler.send(res, true, "User registered successfully", 201, {
    userId: newUser.userId,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    phoneNumber: newUser.phoneNumber,
    email: newUser.email,
  });
};

export const loginUser = async (req, res) => {
  const result = validateSchema(loginUserSchema, req.body);

  if (!result.success) {
    return ResponseHandler.send(res, false, result.error, 400);
  }

  const { email, password } = result.data;

  let existingUser = await User.findOne({ email });

  if (!existingUser) {
    return ResponseHandler.send(res, false, "User not found", 404);
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password);
  if (!passwordMatch) {
    return ResponseHandler.send(res, false, "Invalid credentials", 401);
  }

  const token = createToken(existingUser.userId, existingUser.email);

  return ResponseHandler.send(res, true, "User logged in successfully", 200, {
    token,
    user: {
      userId: existingUser.userId,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      phoneNumber: existingUser.phoneNumber,
      email: existingUser.email,
    },
  });
};

/*
In the future, this will be implemented
1. confirm email
2. reset password
3. forgot password
4. change password
5. maybe social media login
*/
