import express from "express";
const app = express();
import router from "./routes/index.js";
import errorHandler from "./middlewares/error-handler.js";
import notFoundHandler from "./middlewares/not-found.js";
import dotenv from "dotenv";
dotenv.config();

// routes
app.use("/api/v1/user", router.user);
app.use("/api/v1/movie", router.movie);
app.use("/api/v1/person", router.person);
app.use("/api/v1/comment", router.comment);

// middlewares
app.use(errorHandler);
app.use(notFoundHandler);

const port = 3000 || process.env.PORT;
app.listen(port, () => console.log(`Server running on ${port}`));
