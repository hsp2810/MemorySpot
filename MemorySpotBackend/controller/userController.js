import { ObjectId } from "mongodb";
import {
	deleteFriend,
	deleteUserByID,
	getFriendByID,
	getUserByEmail,
	getUserByID,
	insertFriend,
	updateUser,
	getUserByUsername,
	getFriendsByUserID,
	getAllUsers,
} from "../database/user.js";

//done
export const fetchUserById = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res
				.status(401)
				.json({ type: "error", message: "No user ID was sent" });
		}
		const user = await getUserById(id);

		if (!user) {
			return res.status(501).json({
				type: "error",
				message: "No user found based on the ID sent",
			});
		}

		res.status(200).json({
			type: "success",
			message: "User found",
			user: user,
		});
	} catch (error) {
		console.log("No user for that ID found");
	}
};

export const fetchUserByUsername = async (req, res) => {
	try {
		const { username } = req.params;
		if (!username) {
			return res.status(401).json({
				alert: {
					type: "error",
					message: "No user username was sent",
				},
			});
		}

		const user = await getUserByUsername(username);

		if (!user) {
			return res.status(501).json({
				alert: {
					type: "error",
					message: "No user found based on the username sent",
				},
			});
		}

		res.status(200).json({
			alert: {
				type: "success",
				message: "User found based on the username",
			},
			user: user,
		});
	} catch (error) {
		console.log("No user for that username found");
	}
};

export const fetchAllUsers = async (req, res) => {
	try {
		const allUsers = await getAllUsers();

		if (!allUsers) {
			return res.status(501).json({
				type: "error",
				message: "Didn't found any users",
			});
		}

		// We don't want the user who has login into the application
		console.log("AUthentication fucking id: ", req.rootID);
		const filteredUsers = allUsers.filter((user) => {
			console.log("Use if in the filter function: ", user._id);
			return user._id.toString() !== req.rootID;
		});

		res.status(200).json({
			alert: { type: "success", message: "User found" },
			totalUsers: filteredUsers.length,
			users: filteredUsers,
		});
	} catch (error) {
		console.log("No user for that ID found");
	}
};

//done
export const fetchUserByEmail = async (req, res) => {
	try {
		const { email } = req.body;
		if (!email) {
			return res
				.status(401)
				.json({ type: "error", message: "No user email was sent" });
		}

		const user = await getUserByEmail(email);

		if (!user) {
			return res.status(501).json({
				type: "error",
				message: "No user found based on the email sent",
			});
		}

		res.status(200).json({
			type: "success",
			message: "User found",
			user: user,
		});
	} catch (error) {
		console.log("No user for that email found");
	}
};

//done
export const editUser = async (req, res) => {
	try {
		const { username, name, email, password } = req.body;

		if (!username || !name || !email || !password) {
			return res.status(401).json({
				type: "error",
				message: "Please enter all the credentials",
			});
		}

		const user = await getUserByEmail(email);
		if (!user) {
			return res.status(501).json({
				type: "error",
				message: "No user found based on the email sent",
			});
		}

		const updatedUser = await updateUser({
			username,
			name,
			email,
			password,
		});

		res.status(200).json({
			type: "success",
			message: "User updated successfully",
			updatedCount: updatedUser.modifiedCount,
		});
	} catch (error) {
		console.log("Update failed");
	}
};

//done
export const removeUser = async (req, res) => {
	try {
		const { id } = req.params;

		const user = await getUserById(id);

		if (!user) {
			return res.status(501).json({
				type: "error",
				message:
					"No user found based on the ID sent. User must exist in order to delete",
			});
		}

		const deletedUser = await deleteUserByID(id);

		if (deletedUser.deletedCount === 0) {
			return res.status(501).json({
				type: "error",
				message: "No user was deleted.",
			});
		}

		res.status(200).json({
			type: "success",
			message: "User deleted successfully",
		});
	} catch (error) {
		console.log("Unable to delete user");
	}
};

// friends
//done
export const fetchFriendsByUserID = async (req, res) => {
	try {
		const { id } = req.params;

		const userExist = await getUserByID(id);
		if (!userExist) {
			return res.status(401).json({
				type: "error",
				message: "No user found based on the ID sent.",
			});
		}

		const friends = await getFriendsByUserID(id);

		if (friends.length === 0) {
			return res
				.status(501)
				.json({ type: "error", message: "No friends found" });
		}

		res.status(200).json({ type: "success", friends: friends[0].friends });
	} catch (error) {
		console.log(
			"Backend error in adding the friend to the friend list ",
			error
		);
	}
};

export const fetchFriendsDetails = async (req, res) => {
	try {
		const { id } = req.params;
		const returnedFriends = [];

		const userExist = await getUserByID(id);
		if (!userExist) {
			return res.status(401).json({
				alert: {
					type: "error",
					message: "No user found based on the ID sent.",
				},
			});
		}

		const friends = await getFriendsByUserID(id);
		if (friends.length === 0) {
			return res.status(501).json({
				alert: { type: "error", message: "No friends found" },
			});
		}

		const friendsListArr = friends[0].friends;

		for (const friend_id of friendsListArr) {
			const friendDetails = await getUserByID(friend_id.toString());
			returnedFriends.push(friendDetails);
		}

		res.status(200).json({
			alert: { type: "success", message: "Successfully fetched friends" },
			friends: returnedFriends,
		});
	} catch (error) {
		console.log(
			"Backend error in adding the friend to the friend list ",
			error
		);
	}
};

//done
export const addFriend = async (req, res) => {
	try {
		const { id, friendid } = req.params;

		const userExist = await getUserByID(id);
		if (!userExist) {
			return res.status(401).json({
				alert: {
					type: "error",
					message: "No user found based on the ID sent.",
				},
			});
		}

		const friendExist = await getUserByID(friendid);
		if (!friendExist) {
			return res.status(402).json({
				alert: {
					type: "error",
					message:
						"The user you are trying to add as you friend doesn't exist",
				},
			});
		}

		//getting all friends
		const allUserFriends = await getFriendsByUserID(id);

		//If no friends are there I don't want to run the map() function
		if (!(allUserFriends[0].friends.length === 0)) {
			// Clear any blank of null data in the array

			//converting from ObjectId to normal string
			const friendsArr = allUserFriends[0].friends.map((friend) => {
				return friend.toString();
			});

			//checking if friends already exist
			if (friendsArr.includes(friendid)) {
				return res.status(403).json({
					alert: {
						type: "error",
						message: `${friendExist.name} is already in your friend list`,
					},
					friendsCount: allUserFriends[0].friends.length + 0,
				});
			}
		}

		await insertFriend(id, friendid);
		res.status(200).json({
			alert: {
				type: "success",
				message: `${friendExist.name} added as your friend`,
			},
			friendsCount: allUserFriends[0].friends.length + 1,
		});
	} catch (error) {
		console.log(
			"Backend error in adding the friend to the friend list ",
			error
		);
	}
};

//done
export const removeFriend = async (req, res) => {
	try {
		const { id, friendid } = req.params;

		const userExist = await getUserByID(id);
		if (!userExist) {
			return res.status(401).json({
				type: "error",
				message:
					"No user found based on the ID sent. User must exist in order to delete",
			});
		}

		const friendExist = await getUserByID(friendid);
		if (!friendExist) {
			return res.status(402).json({
				type: "error",
				message:
					"The user you are trying to remove from your friends doesn't exist",
			});
		}

		const allUserFriends = await getFriendsByUserID(id);
		if (!(allUserFriends[0].friends.length === 0)) {
			//converting from ObjectId to normal string
			const friendsArr = allUserFriends[0].friends.map((friend) => {
				return friend.toString();
			});

			//checking if friends already exist
			if (!friendsArr.includes(friendid)) {
				return res.status(403).json({
					type: "error",
					message: "User is not present in your friends list",
				});
			}
		}

		await deleteFriend(id, friendid);
		res.status(200).json({
			type: "success",
			message: "User removed from your friends list ",
			friendsCount: allUserFriends[0].friends.length - 1,
		});
	} catch (error) {
		console.log(
			"Backend error in removing the friend from your friend list ",
			error
		);
	}
};

export const searchUser = async (req, res) => {
	try {
		const { username } = req.body;

		if (!username) {
			return res
				.status(401)
				.json({ type: "error", message: "No username was sent" });
		}

		const user = await getUserByUsername(username);

		if (!user) {
			return res.status(501).json({
				type: "error",
				message: "No user found based on the username sent",
			});
		}

		res.status(200).json({
			type: "success",
			message: "User found",
			user: user,
		});
	} catch (error) {
		console.log("No user for that username found");
	}
};
