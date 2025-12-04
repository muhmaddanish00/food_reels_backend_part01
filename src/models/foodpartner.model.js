import mongoose from "mongoose";

const foodPartnerSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 100,
    },
  },
  { timestamps: true }
);

const FoodPartner = mongoose.model("FoodPartner", foodPartnerSchema);

export default FoodPartner;