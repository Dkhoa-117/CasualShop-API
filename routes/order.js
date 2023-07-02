import { Router } from "express";
const router = Router();

import order from "../controllers/order.js";

router
	.route("/")
	.get(order.getUserOrder)
	.post(order.addToCart)
	.put(order.adjustQuantity)
	.delete(order.removeFromCart);
router.route("/full").get(order.getUserOrderById);
router.route("/detail").get(order.getOrder);
router.route("/checkout").put(order.checkout);
router.route("/confirm").put(order.confirmOrder);
router.route("/newcart").post(order.createCart);
export default router;
