import express from "express";
import dotenv from "dotenv";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import connectDB from "./database/conn.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import {
	categoryRoutes,
	userRoutes,
	authRoutes,
	memoryRoutes,
} from "./routes/exportRoutes.js";
import cloudinary from "cloudinary";
dotenv.config();

const app = express();
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

// middlwares for form data
app.use(cookieParser());
app.use(express.json());

// Implementing cloudinary
cloudinary.v2.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});

//All the routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/memories", memoryRoutes);
app.use("/api/v1/categories", categoryRoutes);

app.get("/", (req, res) => {
	res.send("Things are working.");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const URI = process.env.URI;

const start = async () => {
	try {
		await connectDB(URI);
		app.listen(port, () => {
			console.log(`Successfully started and listening at port ${port}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
