// import express from "express";
// import { body } from "express-validator";
// import {
// 	addMemory,
// 	deleteMemory,
// 	getMemoryById,
// 	updateMemory,
// } from "../database/memory.js";
// import { AdminAuthenticate } from "../middleware/authenticate.js";
// import { validationResult } from "express-validator";
// import { StatusCodes } from "http-status-codes";

// const router = express.Router();

// // Add a new memory
// router.post(
// 	"/add",
// 	AdminAuthenticate,
// 	[
// 		body("Title").trim().notEmpty().withMessage("Title is required"),
// 		body("memoryradius")
// 			.notEmpty()
// 			.withMessage("Memory radius is required"),
// 		body("latitude").notEmpty().withMessage("Latitude is required"),
// 		body("longitude").notEmpty().withMessage("Longitude is required"),
// 		body("zoom").notEmpty().withMessage("Zoom level is required"),
// 	],
// 	async (req, res) => {
// 		const errors = validationResult(req);
// 		if (!errors.isEmpty()) {
// 			return res
// 				.status(StatusCodes.BAD_REQUEST)
// 				.json({ errors: errors.array() });
// 		}

// 		try {
// 			const { Title, memoryradius, latitude, longitude, zoom } = req.body;
// 			const ownerId = req.adminID;
// 			const memory = await addMemory(
// 				Title,
// 				memoryradius,
// 				latitude,
// 				longitude,
// 				zoom,
// 				ownerId
// 			);
// 			res.status(StatusCodes.CREATED).json({ memory });
// 		} catch (error) {
// 			console.error(error);
// 			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
// 				message: "Server Error",
// 			});
// 		}
// 	}
// );

// // Update an existing memory
// router.put(
// 	"/:id",
// 	AdminAuthenticate,
// 	[
// 		body("Title").trim().notEmpty().withMessage("Title is required"),
// 		body("memoryradius")
// 			.notEmpty()
// 			.withMessage("Memory radius is required"),
// 		body("latitude").notEmpty().withMessage("Latitude is required"),
// 		body("longitude").notEmpty().withMessage("Longitude is required"),
// 		body("zoom").notEmpty().withMessage("Zoom level is required"),
// 	],
// 	async (req, res) => {
// 		const errors = validationResult(req);
// 		if (!errors.isEmpty()) {
// 			return res
// 				.status(StatusCodes.BAD_REQUEST)
// 				.json({ errors: errors.array() });
// 		}

// 		try {
// 			const { Title, memoryradius, latitude, longitude, zoom } = req.body;
// 			const memoryId = req.params.id;
// 			const memory = await getMemoryById(memoryId);
// 			if (!memory) {
// 				return res
// 					.status(StatusCodes.NOT_FOUND)
// 					.json({ message: "Memory not found" });
// 			}
// 			if (memory.owner !== req.adminID) {
// 				return res
// 					.status(StatusCodes.UNAUTHORIZED)
// 					.json({ message: "Not authorized" });
// 			}
// 			const updatedMemory = await updateMemory(
// 				memoryId,
// 				Title,
// 				memoryradius,
// 				latitude,
// 				longitude,
// 				zoom
// 			);
// 			res.json({ memory: updatedMemory });
// 		} catch (error) {
// 			console.error(error);
// 			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
// 				message: "Server Error",
// 			});
// 		}
// 	}
// );

// // Delete a memory
// router.delete("/:id", AdminAuthenticate, async (req, res) => {
// 	try {
// 		const memoryId = req.params.id;
// 		const memory = await getMemoryById(memoryId);
// 		if (!memory) {
// 			return res
// 				.status(StatusCodes.NOT_FOUND)
// 				.json({ message: "Memory not found" });
// 		}
// 		if (memory.owner !== req.adminID) {
// 			return res
// 				.status(StatusCodes.UNAUTHORIZED)
// 				.json({ message: "Not authorized" });
// 		}
// 		await deleteMemory(memoryId);
// 		res.json({ message: "Memory deleted" });
// 	} catch (error) {
// 		console.error(error);
// 		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
// 			message: "Server Error",
// 		});
// 	}
// });

// // Get a memory by id
// router.get("/:id", AdminAuthenticate, async (req, res) => {
// 	try {
// 		const memoryId = req.params.id;
// 		const memory = await getMemoryById(memoryId);
// 		if (!memory) {
// 			return res
// 				.status(StatusCodes.NOT_FOUND)
// 				.json({ message: "Memory not found" });
// 		}
// 		if (memory.owner !== req.adminID) {
// 			return res
// 				.status(StatusCodes.UNAUTHORIZED)
// 				.json({ message: "Not authorized" });
// 		}
// 		res.json({ memory });
// 	} catch (error) {
// 		console.error(error);
// 		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
// 			message: "Server Error",
// 		});
// 	}
// });
// // Get all memories
// router.get("/", AdminAuthenticate, async (req, res) => {
// 	try {
// 		const ownerId = req.adminID;
// 		const memories = await getMemoriesByOwnerId(ownerId);
// 		res.json({ memories });
// 	} catch (error) {
// 		console.error(error);
// 		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
// 			message: "Server Error",
// 		});
// 	}
// });

// export default router;
