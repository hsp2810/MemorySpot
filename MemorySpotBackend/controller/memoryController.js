/*
    fetchMemoryByID(_id), fetchMemoryByUserID(user_id), insertMemory(memObj), deleteMemory(_id), updateMemory(_id, memObj) 
*/
import {
	getMemoryById,
	getMemoriesByUserID,
	insertMemory,
	updateMemory,
	deleteMemory,
	getMemoryFromBank,
	insertMemoryToBank,
	getMemoriesFromBank,
} from "../database/memory.js";
import errorHandlerMiddleware from "../middleware/errorHandlerMiddleware.js";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataURI.js";
import { getFriendsByUserID, getUserByID } from "../database/user.js";

// Done
export const fetchMemoryByID = async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res
				.status(401)
				.json({ message: "Didn't got proper memory ID" });
		}

		console.log("Memory ID is: ", id);

		const memory = await getMemoryById(id);

		if (!memory) {
			return res
				.status(501)
				.json({ message: "Not memory found based on the ID" });
		}

		res.status(200).json({ message: "Memory found", memory: memory });
	} catch (error) {
		console.log("Backend error in fetching the memory by ID:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const fetchMemoriesByUserID = async (req, res) => {
	try {
		const { id } = req.params;
		const memories = await getMemoriesByUserID(id);

		if (memories.length === 0) {
			return res.status(501).json({
				alert: {
					type: "error",
					message: "No memories found based on the user id",
				},
			});
		}
		res.status(200).json({
			alert: {
				type: "success",
				message: "Fetch the memories based on the user id",
			},
			memories: memories,
		});
	} catch (error) {
		console.log(
			"Backend error in fetching the memories by user ID:",
			error
		);
		res.status(500).json({ message: "Internal server error" });
	}
};

//done
export const addMemory = async (req, res) => {
	try {
		console.log("Hylloefeioubf");
		const { id } = req.params;
		if (!id) {
			return res.status(403).json({
				alert: {
					type: "error",
					message: "Not able to get proper id in the request",
				},
			});
		}

		// Checking if the params id and the authenticate is same or not
		if (id !== req.rootID) {
			return res.status(404).json({
				alert: {
					type: "error",
					message:
						"Sorry the authenticate user and the uploader both are different. Not able to upload the memory",
				},
			});
		}

		// Getting the audio/video file
		const memoryfile = req.file;
		console.log("Mempry file: ", memoryfile);
		if (!memoryfile) {
			return res.status(401).json({
				alert: {
					type: "error",
					message: "File not found inn the add memeory",
				},
			});
		}

		// Parsing
		const fileUri = getDataUri(memoryfile);

		const {
			title,
			caption,
			memoryRadius,
			latitude,
			longitude,
			address,
			category,
		} = req.body;

		// Adding the file to cloudinary
		const uploadedImage = await cloudinary.v2.uploader.upload(
			fileUri.content,
			{ resource_type: "video" }
		);

		// Time at which the user uploaded the memory
		const uploadedDate = new Date();

		const addedMemory = await insertMemory({
			memoryfile: {
				public_id: uploadedImage.public_id,
				url: uploadedImage.secure_url,
			},
			title,
			caption,
			memoryRadius,
			latitude,
			longitude,
			address,
			category,
			owner: id,
			uploadedDate,
		});

		if (!addedMemory) {
			return res.status(501).json({
				alert: { type: "error", message: "Not able to add the memory" },
			});
		}
		res.status(201).json({
			alert: { type: "success", message: "Memory uploaded successfully" },
			addedMemory: addedMemory.insertedId,
			uploadedDate: uploadedDate,
		});
	} catch (error) {
		console.log("Backend error in adding the memory:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

//not done
export const editMemory = async (req, res) => {
	console.log("Going to edit");
	try {
		const {
			memoryfileid,
			id,
			title,
			caption,
			memoryRadius,
			latitude,
			longitude,
			category,
			owner,
		} = req.body;

		// Getting the memory id
		console.log(memoryfileid);

		// Destroying the video file
		const deleted = await cloudinary.v2.uploader.destroy(memoryfileid, {
			resource_type: "video",
		});

		if (deleted.result === "not found") {
			console.log("Priting the deleted: ", deleted);
		}

		// Uploading the updated file by the user
		const memoryfile = req.file;

		if (!memoryfile) {
			return res
				.status(401)
				.json({ type: "error", message: "File not found in the edit" });
		}

		// Parsing
		const fileUri = getDataUri(memoryfile);
		const uploadedImage = await cloudinary.v2.uploader.upload(
			fileUri.content,
			{ resource_type: "video" }
		);

		const result = await updateMemory({
			memoryfile: {
				public_id: uploadedImage.public_id,
				url: uploadedImage.secure_url,
			},
			id,
			title,
			caption,
			memoryRadius,
			latitude,
			longitude,
			category,
			owner,
		});

		if (!result) {
			return res
				.status(501)
				.json({ type: "error", message: "No memories found" });
		}

		res.status(200).json({
			message: "Memory updated successfully",
			updatedCount: result.modifiedCount,
		});
	} catch (error) {
		console.log("Backend error in updating the memory:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

//done
export const removeMemory = async (req, res) => {
	try {
		const { id } = req.params;

		const memory = await getMemoryById(id);

		if (memory.length === 0) {
			return res.status(401).json({
				alert: {
					type: "error",
					message: "Memory don't exist based on the ID.",
				},
			});
		}

		//First need to delete the file from cloudinary
		await cloudinary.v2.uploader.destroy(memory[0].memoryfile.public_id, {
			resource_type: "video",
		});

		const result = await deleteMemory(id);

		if (!result) {
			res.status(404).json({
				alert: {
					type: "error",
					message: "Memory not found",
				},
			});
		}

		res.status(200).json({
			alert: {
				type: "success",
				message: "Memory deleted successfully",
			},
			result,
		});
	} catch (error) {
		console.log("Backend error in deleting the memory:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

//DONE: Very IMP: No one is allowed to change this function except Harshit
//Returns me the list of friends who have uploaded the memory in the last 24 hours
export const fetchFriendsUpMemLast24 = async (req, res) => {
	const friendsList = [];
	const user_id = req.rootID;

	//Get the list of friends.
	const response = await getFriendsByUserID(user_id);
	const friends = response[0].friends;
	if (friends.length === 0) {
		return res.status(501).json({
			alertType: "error",
			message: "You don't have any friends",
		});
	}

	//Take each friend -> Check his/her memories
	for (const friend of friends) {
		await fetchFriendsList(friendsList, friend);
	}

	res.status(200).json({
		alert: {
			type: "success",
			message:
				"Fetched friends who have uploaded memories in the past 24 hours ",
		},
		friends: friendsList,
	});
};

//DONE: Very IMP: No one is allowed to change this function except Harshit
const fetchFriendsList = async (friendsList, friend) => {
	const friendMemories = await getMemoriesByUserID(friend.toString());

	//Found that the user has memories up in last 24 hrs
	const currentTime = new Date();
	const response = friendMemories.filter((memory) => {
		const diffInMilliseconds = Math.abs(currentTime - memory.uploadedDate);
		const diffInSeconds = diffInMilliseconds / 1000;
		const diffInMinutes = diffInSeconds / 60;
		const diffInHours = diffInMinutes / 60;
		return diffInHours <= 24;
	});
	console.log("Printing the response: ", response);

	if (response.length !== 0) {
		const userData = await getUserByID(friend);

		if (!friendsList.includes(userData)) {
			friendsList.push(userData);
		}
	}
	return friendsList;
};

//DONE: Very IMP: No one is allowed to change this function except Harshit
export const fetchFriendMemoriesLast24 = async (req, res) => {
	try {
		const { friend_id } = req.body;

		console.log("Friend id: ", friend_id);
		const memories = await getMemoriesByUserID(friend_id);
		if (memories.length === 0) {
			return null;
		}

		//from the list of the memories fetch the memories of last 24 hours.
		const currentTime = new Date();

		const response = memories.filter((memory) => {
			const diffInMilliseconds = Math.abs(
				currentTime - memory.uploadedDate
			);
			const diffInSeconds = diffInMilliseconds / 1000;
			const diffInMinutes = diffInSeconds / 60;
			const diffInHours = diffInMinutes / 60;
			return diffInHours <= 24;
		});

		res.status(200).json({
			alert: {
				type: "success",
				message:
					"Fetched memories uploaded by the user in last 24 hours",
			},
			memories: response,
		});
	} catch (error) {
		console.log("Backend error in deleting the memory:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

//DONE: Very IMP: No one is allowed to change this function except Harshit
export const fetchFriendMemories = async (req, res) => {
	try {
		//Taking the user id from the authenticate
		const user_id = req.rootID;
		const friendsMemories = [];
		const friendsMemoriesFinal = [];

		//Get the list of friends.
		const response = await getFriendsByUserID(user_id);
		const friends = response[0].friends;
		if (friends.length === 0) {
			return res.status(501).json({
				alertType: "error",
				message: "You don't have any friends",
			});
		}

		for (const friend of friends) {
			const memories = await getMemoriesByUserID(friend);

			if (memories.length !== 0) {
				friendsMemories.push(memories);
			}
		}

		// Here I have an array with sub-array with memories of each user
		//Like [[{}, {}], [{}, {}]] But I don't want this
		for (let i = 0; i < friendsMemories.length; i++) {
			for (let j = 0; j < friendsMemories[i].length; j++) {
				friendsMemoriesFinal.push(friendsMemories[i][j]);
			}
		}

		res.status(200).json({
			alert: {
				type: "success",
				message: "Fetched all the memories of friends",
			},
			memories: friendsMemoriesFinal,
		});
	} catch (error) {
		console.log("Backend error in fetching the memories of your friends");
	}
};

// const filterLast24hrs = async (user_id) => {
// 	try {
// 		//get all memories of one user
// 		const memories = await getMemoriesByUserID(user_id);

// 		console.log("Printing the memories: ", memories);
// 		if (memories.length === 0) {
// 			return null;
// 		}

// 		// //from the list of the memories fetch the memories of last 24 hours.
// 		const currentTime = new Date();

// 		const response = memories.filter((memory) => {
// 			const diffInMilliseconds = Math.abs(
// 				currentTime - memory.uploadedDate
// 			);
// 			const diffInSeconds = diffInMilliseconds / 1000;
// 			const diffInMinutes = diffInSeconds / 60;
// 			const diffInHours = diffInMinutes / 60;
// 			return diffInHours <= 24;
// 		});

// 		console.log("Printing the res: ", response);

// 		return response;
// 	} catch (error) {
// 		console.log(
// 			"Backend error in fetching the data from the database, ",
// 			error
// 		);
// 	}
// };

// Saved
export const addMemoryToBank = async (req, res) => {
	try {
		const { user_id, memory_id } = req.body;

		if (!user_id || !memory_id) {
			return res.status(400).json({
				alert: { type: "error", message: "No proper values found" },
			});
		}

		const alreadySaved = await getMemoryFromBank(user_id, memory_id);

		if (alreadySaved) {
			return res.status(501).json({
				alert: {
					type: "error",
					message: "Memory is already saved on the memory bank",
				},
			});
		}

		const savedPost = await insertMemoryToBank(user_id, memory_id);

		if (!savedPost || !savedPost.insertedId) {
			return res.status(500).json({
				alert: {
					type: "error",
					message: "Not able to save the post to the database",
				},
			});
		}

		return res.status(200).json({
			alert: {
				type: "success",
				message: "Memory saved to the bank",
			},
		});
	} catch (error) {
		console.log(
			"Backend error in adding the saved post to the database: ",
			error
		);
	}
};

export const fetchMemoryFromBank = async (req, res) => {
	try {
		const { user_id, memory_id } = req.params;

		if (!user_id || !memory_id) {
			return res.status(400).json({
				alert: { type: "error", message: "No proper values found" },
			});
		}

		const memory = await getMemoryFromBank(user_id, memory_id);

		if (!memory) {
			return res.status(501).json({
				alert: { type: "error", message: "Memory not found" },
			});
		}

		return res.status(200).json({
			alert: {
				type: "success",
				message: "Got the memory",
			},
			memory: memory,
		});
	} catch (error) {
		console.log(
			"Backend error in adding the saved post to the database: ",
			error
		);
	}
};

export const fetchMemoriesFromBank = async (req, res) => {
	try {
		const user_id = req.rootID;

		// console.log("Root ID is: ", user_id);

		if (!user_id) {
			return res
				.status(400)
				.json({ alert: { type: "error", message: "ID not valid" } });
		}

		const bankMemories = await getMemoriesFromBank(user_id);
		console.log(
			"Bank memories I am getting from the database: ",
			bankMemories
		);

		if (bankMemories && bankMemories.length === 0) {
			return res.status(500).json({
				alert: {
					type: "error",
					message: "You haven't saved any posts.",
				},
			});
		}

		res.status(200).json({
			alert: {
				type: "success",
				message:
					"Successfully fetched the saved memories from the bank based on the user_id",
			},
			memories: bankMemories,
		});
	} catch (error) {
		console.log(
			"Backend error in adding the saved post to the database: ",
			error
		);
	}
};
