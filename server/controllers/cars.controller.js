const errorHandler = require("../lib/err");
const { responseHandler } = require("../lib/response");
const Car = require("../models/car.model");

exports.getCar = async (req, res, next) => {
  const { carId } = req.params;
  if (!carId) return next(errorHandler(411, "Id is required"));
  try {
    const car = await Car.findById(carId);
    if (!car) return next(errorHandler(404, "No Car found"));
    return responseHandler(res, 200, car, "car fetched successfully");
  } catch (error) {
    console.log("getting Car: ", error);
    next(error);
  }
};
