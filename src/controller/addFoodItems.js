import AddFood from "../models/addfood.model.js";
import { uploadImageToImageKit } from "../services/service.js";
import { v4 as uuidv4 } from 'uuid';

export async function createFoodItem(req, res) {
  try {
    console.log("FoodPartner From Middleware:", req.foodPartner);
    console.log("File:", req.file);

    const uniqueName = uuidv4() + "_" + req.file.originalname;

    const uploadResult = await uploadImageToImageKit(
      req.file.buffer,
      uniqueName
    );

    // console.log("Upload Result:", uploadResult);

    const foodItems = await AddFood.create({
        name: req.body.name,
        video: uploadResult.url,
        description: req.body.description,
        FoodPartner: req.foodPartner._id
    })

    res.json({
      message: "Success",
      uploaded_image_url: uploadResult.url,  
      foodPartner: foodItems
      
      
    });

  } catch (error) {
    res.status(500).json({
      message: "Upload failed",
      error: error.message,
    });
  }
}
