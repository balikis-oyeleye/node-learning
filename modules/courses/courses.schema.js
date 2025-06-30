import { z } from "zod";

export const courseSchema = z.object({
  name: z.string().min(3).nonempty("Name is required"),
});
