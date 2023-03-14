import express from "express";
const router = express.Router();

import product from "../controllers/product.js";

router.route("/").get(product.getAll);

export default router;
