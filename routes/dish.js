const express = require("express");
const router = express.Router();
const dishController = require("../controllers/dishController")

router.post(
  "/dishes",
  dishController.createDish
);

router.get(
  "/dishes/:mealId",
  dishController.getDishesForUser
);

router.delete(
   "/dishes/:mealId/:dishId",
   dishController.deleteDish
);

module.exports = router;
