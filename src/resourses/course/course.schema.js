import { z } from "zod";

export const courseSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().optional(),
  instructorId: z.string().nonempty("Instructor ID is required"),
  categories: z
    .array(z.string())
    .nonempty("At least one category is required")
    .refine(
      (categories) =>
        categories.every((category) =>
          [
            "Programming",
            "Design",
            "Marketing",
            "Business",
            "Data Science",
            "Other",
          ].includes(category)
        ),
      {
        message: "Invalid category provided",
      }
    ),
  tags: z.array(z.string()).optional(),
  isActive: z.boolean().default(true),
});
