const {meal} = require("../models/meal")
const{dish} = require("../models/dish")
const createMeal = async (req, res) => {
  try {
    const { name, type } = req.body;
    userId = req.userId;

    const newMeal = new meal({
      userId,
      name,
      type,
    });

    const savedMeal = await newMeal.save();

    res.status(201).json(savedMeal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMealsForUser = async (req, res) => {
  try {
    const userId = req.userId;
    const meals = await meal.find({ userId }).exec();

    res.status(200).json(meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteMeal = async (req, res) => {
   try {
     const { mealId } = req.params;

     const deletedMeal = await meal.findByIdAndDelete(
       mealId
     );

     if (!deleteMeal) {
       return res.status(404).json({ error: "Meal not found" });
     }
     await dish.deleteMany({ mealId });
     res.status(200).json({ message: "Meal deleted successfully" });
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: "Internal Server Error" });
   }
};

module.exports = {
  createMeal,
  getMealsForUser,
  deleteMeal,
};
