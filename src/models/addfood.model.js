import mongoose from "mongoose";
import FoodPartner from "./foodpartner.model.js";

const addFoodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    video:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    FoodPartner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:FoodPartner,
        required:true
    }


},{timestamps:true});

const AddFood = mongoose.model("AddFood", addFoodSchema);
export default AddFood;