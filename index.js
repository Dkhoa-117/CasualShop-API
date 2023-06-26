import express from "express";
const app = express();
import router from "./routes/index.js";
import errorHandler from "./middlewares/error-handler.js";
import notFoundHandler from "./middlewares/not-found.js";
import setup from "./database/init.js";
import hardReset from "./database/hard-reset.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
app.use(express.json());
app.use(cors());

app.use("/images", express.static("images"));
app.use("/api/v1/product", router.product);
app.use("/api/v1/category", router.category);
app.use("/api/v1/discount", router.discount);
app.use("/api/v1/order", router.order);
app.use("/api/v1/wishlist", router.wishes);
app.get("/ping", (req, res) => {
	res.status(200).send("Server is running");
});
app.get("/initial", (req, res) => {
	hardReset.all()
	setTimeout(() => setup.initial(), 5000);	
	res.send("initial database");
});
// middlewares
app.use(errorHandler);
app.use(notFoundHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on ${port}`));
