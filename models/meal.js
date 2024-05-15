const mongoose = require("mongoose");
const { Meals } = require("../constants");

const mealSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        name: { type: String, required: true },
        dishes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Dish'}],
        type: {
        type: String,
        required: true,
        enum: Object.values(Meals),
    }
    },
    { collection: "meals" }
);

const meal = mongoose.model(
  "meal",
  mealSchema
);

module.exports = { meal };