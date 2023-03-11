import express from "express";
import category from "../controllers/category.js";
const router = express.Router();

router.route("/all").get(category.getAll);

export default router;
