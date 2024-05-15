const express = require("express");
const router = express.Router();
const mealController = require("../controllers/mealController")

router.post(
  "/meals",
  mealController.createMeal
);

router.get(
  "/meals",
  mealController.getMealsForUser
);

router.delete(
   "/meals/:mealId",
   mealController.deleteMeal
);

module.exports = router;
