import AddFood from "../models/addfood.model.js";

export async function getFoodItems(req, res) {
    const foodItem = await AddFood.find({});
    res.json({
        message: "Food Items fetched successfully",
        foodItem: foodItem
    });
}