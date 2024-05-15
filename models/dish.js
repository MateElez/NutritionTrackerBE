const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        calories: {type: Number, required: true},
        carbs: {type: Number, required: true},
        protein: {type: Number, required: true},
        fat: {type: Number, required: true},
    },
    { collection: "dishes" }
);

const dish = mongoose.model(
  "dish",
  dishSchema
);

module.exports = { dish };