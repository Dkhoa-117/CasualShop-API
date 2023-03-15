import express from "express";
const app = express();
import router from "./routes/index.js";
import errorHandler from "./middlewares/error-handler.js";
import notFoundHandler from "./middlewares/not-found.js";
import dotenv from "dotenv";
dotenv.config();

// routes
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:5173");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});
app.use("/images", express.static("images"));
app.use("/api/v1/product", router.product);
app.use("/api/v1/category", router.category);
app.use("/api/v1/discount", router.discount);
app.get("/ping", (req, res) => {
	res.status(200).send("Server is running");
});
// middlewares
app.use(errorHandler);
app.use(notFoundHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on ${port}`));
