import express from "express";
const router = express.Router();

import product from "../controllers/product.js";

router.route("/").get(product.getAll);
router.route("/:id").get(product.getById);

export default router;
