import { z } from "zod";

export const instructorSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().nonempty("Email is required").email(),
  phoneNumber: z.string().nonempty("Phone number is required"),
});
