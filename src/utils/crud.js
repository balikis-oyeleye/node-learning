import { ResponseHandler } from "./response-handler";
import { validateSchema } from "./validate";

export const createOne = (Model, schema, modelName) => async (req, res) => {
  try {
    const result = validateSchema(schema, req.body);
    if (!result.success) {
      return ResponseHandler.send(res, false, result.error, 400);
    }

    const data = result.data;
    const createdData = await Model.create(data);

    if (!createdData) {
      return ResponseHandler.send(
        res,
        false,
        `${modelName} creation failed`,
        500
      );
    }

    return ResponseHandler.send(
      res,
      true,
      `${modelName} created successfully`,
      201,
      createdData
    );
  } catch (error) {
    return ResponseHandler.send(res, false, error.message, 500);
  }
};

export const updateOne = (Model, schema, modelName) => async (req, res) => {
  try {
    const itemId = req.params.id;

    if (!itemId || !mongoose.Types.ObjectId.isValid(itemId)) {
      return ResponseHandler.send(res, false, `Invalid ${modelName} ID`, 400);
    }

    const result = validateSchema(schema, req.body);
    if (!result.success) {
      return ResponseHandler.send(res, false, result.error, 400);
    }

    const data = await Model.findById(itemId);
    if (!data) {
      return ResponseHandler.send(res, false, `${modelName} not found`, 404);
    }

    const updatedData = await Model.findByIdAndUpdate(itemId, result.data, {
      new: true,
    });

    if (!updatedData) {
      return ResponseHandler.send(
        res,
        false,
        `${modelName} update failed`,
        500
      );
    }

    return ResponseHandler.send(
      res,
      true,
      `${modelName} updated successfully`,
      200,
      updatedData
    );
  } catch (error) {
    return ResponseHandler.send(res, false, error.message, 500);
  }
};

export const deleteOne = (Model, modelName) => async (req, res) => {
  try {
    const itemId = req.params.id;
    if (!itemId || !mongoose.Types.ObjectId.isValid(itemId)) {
      return ResponseHandler.send(res, false, `Invalid ${modelName} ID`, 400);
    }

    const data = await Model.findById(itemId);
    if (!data) {
      return ResponseHandler.send(res, false, `${modelName} not found`, 404);
    }

    await Model.findByIdAndDelete(itemId);

    return ResponseHandler.send(
      res,
      true,
      `${modelName} deleted successfully`,
      200
    );
  } catch (error) {
    return ResponseHandler.send(res, false, error.message, 500);
  }
};

export const getOne = (Model, modelName) => async (req, res) => {
  try {
    const itemId = req.params.id;
    if (!itemId || !mongoose.Types.ObjectId.isValid(itemId)) {
      return ResponseHandler.send(res, false, `Invalid ${modelName} ID`, 400);
    }

    const data = await Model.findById(itemId);
    if (!data) {
      return ResponseHandler.send(res, false, `${modelName} not found`, 404);
    }

    return ResponseHandler.send(
      res,
      true,
      `${modelName} retrieved successfully`,
      200,
      data
    );
  } catch (error) {
    return ResponseHandler.send(res, false, error.message, 500);
  }
};

export const crudController = (Model, schema, modelName) => ({
  create: createOne(Model, schema, modelName),
  update: updateOne(Model, schema, modelName),
  delete: deleteOne(Model, modelName),
  get: getOne(Model, modelName),
});
