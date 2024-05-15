const {dish} = require("../models/dish");
const { meal } = require("../models/meal");


const createDish = async (req, res) => {
  try {
    const { mealId, name, calories, carbs, protein, fat } = req.body;

    const newDish = new dish({name, calories, carbs, protein, fat});

    const savedDish = await newDish.save();

    const meaL = await meal.findById(mealId)
    if (!meaL) {
      return res.status(404).json({ error: "Meal not found" });
    }
    meaL.dishes.push(savedDish._id)
    await meaL.save();
    res.status(201).json(savedDish);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getDishesForUser = async (req, res) =>{
  try {
    const { mealId } = req.params;

    const meaL = await meal.findById(mealId);

    if (!meaL) {
      return res.status(404).json({ error: "Meal not found" });
    }
    const dishes = await dish.find({ _id: { $in: meaL.dishes } });
    
    res.status(200).json(dishes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
const deleteDish = async (req, res) => {
  try {
    const {mealId, dishId } = req.params;
    const meaL = await meal.findById(mealId);
    if (!meaL) {
       return res.status(404).json({ error: "Meal not found" });
    }
    
    const index = meaL.dishes.indexOf(dishId);
    if (index !== -1) {
     const removedDishId = meaL.dishes.splice(index, 1)[0];
     await meaL.save();

     await dish.deleteOne({ _id: removedDishId });

     res
       .status(200)
       .json({
         message: "Dish removed from meal and deleted successfully",
       });
   } else {
     res.status(404).json({ error: "Dish not found in the meal" });
   }
 } catch (error) {
   console.error(error);
   res.status(500).json({ error: "Internal Server Error" });
 }
};


module.exports = {
  createDish,
  getDishesForUser,
  deleteDish
};
