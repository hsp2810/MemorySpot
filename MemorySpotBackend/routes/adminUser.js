import express from "express";
import {
	addUser,
	editUser,
	fetchAllUsers,
	fetchUserById,
	removeUser,
} from "../controller/userController.js";
import { body, check, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { AdminAuthenticate } from "../middleware/authenticate.js";

const router = express.Router();

// Fetch all users
router.get("/", AdminAuthenticate, async (req, res) => {
	try {
		const users = await fetchAllUsers();
		res.json({ users });
	} catch (error) {
		console.error(error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "Server Error",
		});
	}
});

// Fetch a user by ID
router.get("/:id", AdminAuthenticate, async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await fetchUserById(userId);
		if (!user) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ message: "User not found" });
		}
		res.json({ user });
	} catch (error) {
		console.error(error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "Server Error",
		});
	}
});

// Add a new user
router.post(
	"/",
	AdminAuthenticate,
	[
		check("username").notEmpty().withMessage("Username is required"),
		check("name").notEmpty().withMessage("Name is required"),
		check("email", "Enter a valid email address").isEmail(),
		check("password")
			.isAlphanumeric()
			.isLength({ min: 5 })
			.withMessage("Password should be at least of 5 characters"),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ errors: errors.array() });
		}

		try {
			const { username, name, email, password } = req.body;
			const user = await addUser(username, name, email, password);
			res.status(StatusCodes.CREATED).json({ user });
		} catch (error) {
			console.error(error);
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Server Error",
			});
		}
	}
);

// Update an existing user
router.put(
	"/:id",
	AdminAuthenticate,
	[
		check("name").notEmpty().withMessage("Name is required"),
		check("email", "Enter a valid email address").isEmail(),
		check("password")
			.isAlphanumeric()
			.isLength({ min: 5 })
			.withMessage("Password should be at least of 5 characters"),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ errors: errors.array() });
		}

		try {
			const { name, email, password } = req.body;
			const userId = req.params.id;
			const user = await fetchUserById(userId);
			if (!user) {
				return res
					.status(StatusCodes.NOT_FOUND)
					.json({ message: "User not found" });
			}
			const updatedUser = await editUser(userId, name, email, password);
			res.json({ user: updatedUser });
		} catch (error) {
			console.error(error);
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Server Error",
			});
		}
	}
);

// Delete a user
router.delete("/:id", AdminAuthenticate, async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await fetchUserById(userId);
		if (!user) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ message: "User not found" });
		}
		await removeUser(userId);
		res.json({ message: "User removed" });
	} catch (error) {
		console.error(error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "Server Error",
		});
	}
});

// Add a friend to a user
router.post("/:id/friends", AdminAuthenticate, async (req, res) => {
	try {
		const userId = req.params.id;
		const friendId = req.body.friendId;
		const user = await fetchUserById(userId);
		if (!user) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ message: "User not found" });
		}
		const friend = await fetchUserById(friendId);
		if (!friend) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ message: "Friend not found" });
		}
		const updatedUser = await addFriend(userId, friendId);
		res.json({ user: updatedUser });
	} catch (error) {
		console.error(error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "Server Error",
		});
	}
});

// Remove a friend from a user
router.delete("/:id/friends/:friendId", AdminAuthenticate, async (req, res) => {
	try {
		const userId = req.params.id;
		const friendId = req.params.friendId;
		const user = await fetchUserById(userId);
		if (!user) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ message: "User not found" });
		}
		const friend = await fetchUserById(friendId);
		if (!friend) {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ message: "Friend not found" });
		}
		const updatedUser = await removeFriend(userId, friendId);
		res.json({ user: updatedUser });
	} catch (error) {
		console.error(error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: "Server Error",
		});
	}
});

export default router;
