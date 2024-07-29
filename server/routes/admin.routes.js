const authMiddleware  = require("../middlewares/auth.middleware.js");
const {
  createShowRoom,
  updateShowRoom,
  getShowRoom,
  deleteShowRoom,
  addCar,
} = require("../controllers/admin.controller.js");

const router = require("express").Router();

router.post("/create-showroom", authMiddleware("admin"), createShowRoom);
router.patch("/update-showroom/:id", authMiddleware("admin"), updateShowRoom);
router.get("/update-showroom/:id", authMiddleware("admin"), getShowRoom);
router.delete("/update-showroom/:id", authMiddleware("admin"), deleteShowRoom);
router.post("/add-car/:showroomId", authMiddleware("admin"), addCar);

module.exports = router;
 