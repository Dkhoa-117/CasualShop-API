import express from "express";
const app = express();
import router from "./routes/index.js";
import errorHandler from "./middlewares/error-handler.js";
import notFoundHandler from "./middlewares/not-found.js";
import dotenv from "dotenv";
dotenv.config();

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});
// routes
app.use("/api/v1/product", router.product);
app.use("/api/v1/category", router.category);
app.use("/api/v1/discount", router.discount);

// middlewares
app.use(errorHandler);
app.use(notFoundHandler);

const port = 3000 || process.env.PORT;
app.listen(port, () => console.log(`Server running on ${port}`));
