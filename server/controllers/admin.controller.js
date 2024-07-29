const errorHandle = require("../lib/err.js");
const Showroom = require("../models/showroom.model.js");
const User = require("../models/user.model.js");
const { responseHandler } = require("../lib/response.js");
const { Admin } = require("../models/admin.model.js");
const Car = require("../models/car.model.js");

const createShowRoom = async (req, res, next) => {
  const { name, location, owner } = req.body;
  if (req.user._id === owner)
    return next(errorHandle(403, "You are Not The Owner"));
  try {
    const showroom = new Showroom({ name, location, owner });
    await showroom.save();
    if (!showroom) return next(errorHandle(400, "Error creating Showroom"));
    return responseHandler(res, 200, showroom, "showroom created successfully");
  } catch (error) {
    console.log("create showroom: ", error);
    next(error);
  }
};
const updateShowRoom = async (req, res, next) => {
  const { name, location } = req.body;
  const { id } = req.params;
  if (!id) return next(errorHandle(411, "showroomId is required"));
  try {
    const showroom = await Showroom.findByIdAndUpdate(id, {
      $set: {
        name,
        location,
      },
    });
    if (!showroom) return next(errorHandle(404, "no showroom found"));

    return responseHandler(res, 200, showroom, "showroom updated successfully");
  } catch (error) {
    console.log("update showroom: ", error);
    next(error);
  }
};
const getShowRoom = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(errorHandle(411, "showroomId is required"));
  try {
    const showroom = await Showroom.findById(id);
    if (!showroom) return next(errorHandle(404, "no showroom found"));

    return responseHandler(res, 200, showroom, "successfully fetched");
  } catch (error) {
    console.log("get showroom: ", error);
    next(error);
  }
};
const deleteShowRoom = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(errorHandle(411, "showroomId is required"));
  try {
    const pipeline = [
      { $match: { _id: id } },
      {
        $lookup: {
          from: "cars",
          localField: "cars",
          foreignField: "_id",
          as: "cars",
        },
      },
      {
        $project: {
          carsIds: "$cars._id",
        },
      },
    ];
    const userId = req.user.id;

    const user = await Admin.findByIdAndUpdate(userId, {
      $pull: { showroom: id },
    });

    const showroom = await Showroom.aggregate(pipeline).exec();
    if (!showroom.length)
      return next(errorHandle(404, "showroom data not found"));

    const { carsIds } = showroom[0];
    const bulkCars = carsIds.map((id) => ({
      deleteOne: { filter: { _id: id } },
    }));

    await Car.bulkWrite(bulkCars);

    await Showroom.deleteOne({ _id: id });

    return responseHandler(res, 200, showroom, "showroom created successfully");
  } catch (error) {
    console.log("create showroom: ", error);
    next(error);
  }
};
const addCar = async (req, res, next) => {
  const { make, model, year, image, description, link3DModel } = req.body;
  const { showroomId } = req.params;

  if (!showroomId) return next(errorHandle(411, "showroomId is required"));

  try {
    const showroom = await Showroom.findById(showroomId);
    if (!showroom) return next(errorHandle(404, "Showroom not found"));

    const car = new Car({
      make,
      model,
      year,
      image,
      description,
      link3DModel,
      showroom: showroomId,
    });

    const savedCar = await car.save();
    showroom.cars.push(savedCar._id);
    await showroom.save();

    return responseHandler(res, 201, savedCar, "Car added successfully");
  } catch (error) {
    console.error("addCar: ", error);
    next(error);
  }
};

module.exports = {
  createShowRoom,
  updateShowRoom,
  getShowRoom,
  deleteShowRoom,
  addCar,
};
