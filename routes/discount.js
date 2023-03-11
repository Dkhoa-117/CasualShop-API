import express from "express";
const router = express.Router();
import discount from "../controllers/discount.js";

router.route("/all").get(discount.getAll);

export default router;
