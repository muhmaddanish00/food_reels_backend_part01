import { Router } from "express";
import signUpController, { foodPartnerloginController, foodPartnerLogoutController, foodPartnerSignUpController, loginController, logoutController } from "../controller/signup.js";
import { authFoodPartner } from "../middlewares/auth.middleware.js";
import multer from "multer";
import { createFoodItem} from "../controller/addFoodItems.js";
import { getFoodItems } from "../controller/getFoodItems.js";

const upload = multer({
    storage: multer.memoryStorage()
})

const router = Router();

router.post('/signup', signUpController);
router.post('/login', loginController);
router.post('/logout', logoutController);
router.post('/foodpartner/signup', foodPartnerSignUpController);
router.post('/foodpartner/login',  foodPartnerloginController);
router.post('/foodpartner/logout', foodPartnerLogoutController);
router.post('/', authFoodPartner, upload.single("video"), createFoodItem);
router.get('/getall', authFoodPartner, getFoodItems);

export default router;