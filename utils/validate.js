export const validateSchema = (schema, data, res) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    res.status(400).json({ errors: result.error.format() });
    return { success: false };
  }

  return { success: true, data: result.data };
};
