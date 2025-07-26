const formatZodError = (error) => {
  const formatted = {};

  error.errors.forEach((err) => {
    if (err.path.length > 0) {
      const field = err.path[0];
      formatted[field] = err.message;
    }
  });

  return formatted;
};

export const validateSchema = (schema, data) => {
  if (!data) return { success: false, error: "Data is required" };

  const result = schema.safeParse(data);

  if (!result.success) {
    return { success: false, error: formatZodError(result.error) };
  }

  return { success: true, data: result.data };
};
