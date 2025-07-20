export const validateSchema = (schema, data) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    return { success: false, error: result.error.format() };
  }

  return { success: true, data: result.data };
};
