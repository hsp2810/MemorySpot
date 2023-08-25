import express from "express";
import { body, check, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import {
	addMemory,
	editMemory,
	fetchMemoryByID,
	fetchMemoriesByUserID,
	removeMemory,
	fetchFriendsUpMemLast24,
	fetchFriendMemoriesLast24,
	fetchFriendMemories,
	fetchMemoryFromBank,
	fetchMemoriesFromBank,
	addMemoryToBank,
} from "../controller/memoryController.js";
import { Authenticate } from "../middleware/authenticate.js";
import singleUpload from "../middleware/multer.js";
// import adminMemory from "./adminMemory.js";

const router = express.Router();

/* Routes description
	1. /memories
	2. /memories/:id
	3. 
*/

// main memories
// router.route("/");

//Has all the memories of the friends
router.route("/friends").get(Authenticate, fetchFriendMemories); //returns all memories

//Returns memories uploaded in last 24 hours by a single user
router.route("/friend").post(Authenticate, fetchFriendMemoriesLast24);
router.route("/friends24").get(Authenticate, fetchFriendsUpMemLast24); // returns users

// Saved: Memory bank
router
	.route("/memorybank")
	.get(Authenticate, fetchMemoriesFromBank)
	.post(addMemoryToBank);
router.route("/memorybank/:user_id/:memory_id").get(fetchMemoryFromBank);
// .post(editMemoryFromBank)
// .delete(removeMemoryFromBank);

//Memories CRUD based on the memory id
router
	.route("/:id")
	.get(
		// [
		// 	check("id")
		// 		.isAlphanumeric()
		// 		.isLength({ min: 10 })
		// 		.withMessage("Invalid ID, we need MongoDB ID"),
		// ],
		Authenticate,
		(req, res) => {
			try {
				var errors = validationResult(req);
				if (errors.errors.length === 0) {
					fetchMemoryByID(req, res);
				} else {
					//errors will be printed in here
					res.status(StatusCodes.BAD_REQUEST).send(errors);
				}
			} catch (error) {
				console.log(error);
				res.send("error occured");
			}
		}
	)
	// edit memory
	.post(
		// [
		// 	check("title")
		// 		.isString()
		// 		.not()
		// 		.isEmpty()
		// 		.withMessage("Title cannot be empty"),
		// 	check("caption").isString(),
		// 	check("latitude")
		// 		.isFloat()
		// 		.not()
		// 		.isEmpty()
		// 		.withMessage("Latitude is MUST"),
		// 	check("longitude")
		// 		.isFloat()
		// 		.not()
		// 		.isEmpty()
		// 		.withMessage("Need longitude"),
		// 	check("zoom").isFloat().not().isEmpty().withMessage("Need zoom"),
		// 	check("owner")
		// 		.isAlphanumeric()
		// 		.isLength({ min: 10 })
		// 		.withMessage("Invalid ID, we need MongoDB ID"),
		// 	check("accessRadius")
		// 		.isFloat()
		// 		.notEmpty()
		// 		.withMessage("need value"),
		// ],
		Authenticate,
		singleUpload.single("memoryfile"),
		editMemory
	)

	// delete memory
	.delete(
		// [
		// 	check("_id")
		// 		.isAlphanumeric()
		// 		.isLength({ min: 10 })
		// 		.withMessage("Invalid ID, we need MongoDB ID"),
		// ],
		Authenticate,
		(req, res) => {
			try {
				var errors = validationResult(req);
				if (errors.errors.length === 0) {
					removeMemory(req, res);
				} else {
					res.status(StatusCodes.BAD_REQUEST).send(errors);
				}
			} catch (error) {
				console.log(error);
				res.send("error occured");
			}
		}
	);

// Memories of user
router
	.route("/user/:id")
	.get(fetchMemoriesByUserID)
	.post(
		// [
		// 	check("title").isString().not().isEmpty().withMessage("Need Title"),
		// 	check("caption").isString(),
		// 	check("latitude").isFloat().not().isEmpty().withMessage("Need Lat"),
		// 	check("longitude")
		// 		.isFloat()
		// 		.not()
		// 		.isEmpty()
		// 		.withMessage("Need longitude"),
		// 	check("zoom").isFloat().not().isEmpty().withMessage("Need zoom"),
		// 	check("owner")
		// 		.isAlphanumeric()
		// 		.isLength({ min: 10 })
		// 		.withMessage("Invalid ID, we need MongoDB ID"),
		// 	check("accessRadius")
		// 		.isFloat()
		// 		.notEmpty()
		// 		.withMessage("need value"),
		// ],
		Authenticate,
		singleUpload.single("memoryfile"),
		(req, res) => {
			try {
				var errors = validationResult(req);
				if (errors.errors.length === 0) {
					addMemory(req, res);
				} else {
					res.status(StatusCodes.BAD_REQUEST).send(errors);
				}
			} catch (error) {
				console.log(error);
				res.send("error occured");
			}
		}
	);

export default router;
