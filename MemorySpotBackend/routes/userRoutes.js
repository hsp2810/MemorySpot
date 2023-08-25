import express from "express";
import {
	addFriend,
	editUser,
	fetchAllUsers,
	fetchFriendsByUserID,
	fetchFriendsDetails,
	fetchUserById,
	fetchUserByUsername,
	removeFriend,
	removeUser,
} from "../controller/userController.js";
import { body, check, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { Authenticate } from "../middleware/authenticate.js";
const router = express.Router();

router.get("/", Authenticate, fetchAllUsers);

router.get("/usernames/:username", Authenticate, fetchUserByUsername);

router
	.route("/:id")
	.get(fetchUserById)
	.put(
		[
			check("name")
				.isLength({ min: 5 })
				.withMessage("Name should not be empty"),
			check("email", "Enter a valid email address").not().isEmpty(),
			body("email").isEmail(),
			check("password")
				.isAlphanumeric()
				.isLength({ min: 5 })
				.withMessage("Password should be at least of 5 characters"),
		],
		Authenticate,
		editUser
	)
	.delete(
		[
			check("id")
				.isAlphanumeric()
				.isLength({ min: 10 })
				.withMessage("Invalid ID, we need MongoDB ID"),
		],
		Authenticate,
		removeUser
	);

// friends
router.route("/:id/friends").get(fetchFriendsByUserID);

router.route("/:id/friendsDetails").get(fetchFriendsDetails);

router
	.route("/:id/friends/:friendid")
	.get(
		[
			check("id")
				.isAlphanumeric()
				.isLength({ min: 10 })
				.withMessage("Invalid ID, we need MongoDB ID"),

			check("friendid")
				.isAlphanumeric()
				.isLength({ min: 10 })
				.withMessage("Invalid ID, we need MongoDB ID"),
		],
		addFriend
	)

	.delete(
		[
			check("id")
				.isAlphanumeric()
				.isLength({ min: 10 })
				.withMessage("Invalid ID, we need MongoDB ID"),

			check("friendid")
				.isAlphanumeric()
				.isLength({ min: 10 })
				.withMessage("Invalid ID, we need MongoDB ID"),
		],
		removeFriend
	);

export default router;
