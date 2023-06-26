import { Router } from "express";
const router = Router();
import wishes from "../controllers/wishes.js";

router
	.route("/")
	.get(wishes.getWishList)
	.post(wishes.add2WishList)
	.delete(wishes.removeFromWishList);

export default router;
