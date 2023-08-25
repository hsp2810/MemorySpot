import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import errorHandlerMiddleware from "../middleware/errorHandlerMiddleware.js";
dotenv.config();

const getUserByID = async (user_id) => {
	const client = new MongoClient(process.env.URI);
	try {
		const objId = new ObjectId(user_id);
		await client.connect();
		return await client
			.db("memoryspot")
			.collection("users")
			.findOne({ _id: objId }, { password: 0 });
	} catch (error) {
		console.log("Datbase error .");
		console.log(error);
	} finally {
		await client.close();
	}
};

export const getAllUsers = async () => {
	const client = new MongoClient(process.env.URI);
	try {
		await client.connect();
		return await client
			.db("memoryspot")
			.collection("users")
			.find()
			.toArray();
	} catch (error) {
		console.log("Datbase error .");
		console.log(error);
	} finally {
		await client.close();
	}
};

const getUserByEmail = async (email) => {
	const client = new MongoClient(process.env.URI);
	try {
		await client.connect();
		return await client
			.db("memoryspot")
			.collection("users")
			.findOne({ email }, { password: 0 });
	} catch (error) {
		console.log("Database error in login the user: ", error);
		console.log(error);
	} finally {
		await client.close();
	}
};

const getUserByUsername = async (username) => {
	const client = new MongoClient(process.env.URI);
	try {
		await client.connect();
		return await client
			.db("memoryspot")
			.collection("users")
			.findOne({ username }, { password: 0 });
	} catch (error) {
		console.log(
			"Database error in fetching the user based on the username ",
			error
		);
		console.log(error);
	} finally {
		await client.close();
	}
};

const searchUser = async (username) => {
	const client = new MongoClient(process.env.URI);
	try {
		await client.connect();
		return await client
			.db("memoryspot")
			.collection("users")
			.aggregate({ $project: { username: 1, email: 1, name: 1 } });
	} catch (error) {
		console.log(
			"Database error in fetching the user based on the username ",
			error
		);
		console.log(error);
	} finally {
		await client.close();
	}
};

const insertUser = async (user) => {
	const client = new MongoClient(process.env.URI);
	try {
		await client.connect();
		return await client
			.db("memoryspot")
			.collection("users")
			.insertOne(user);
	} catch (error) {
		console.log(error);
	} finally {
		await client.close();
	}
};

const updateUser = async (user) => {
	const client = new MongoClient(process.env.URI);
	try {
		await client.connect();
		return await client
			.db("memoryspot")
			.collection("users")
			.updateOne({ email: user.email }, { $set: user });
	} catch (error) {
		console.log("Error while updating user.");
	} finally {
		await client.close();
	}
};

const deleteUserByEmail = async (email) => {
	const client = new MongoClient(process.env.URI);
	try {
		await client.connect();
		return await client
			.db("memoryspot")
			.collection("users")
			.deleteOne({ email: email });
	} catch (error) {
		console.log("Error while deleting.");
	} finally {
		await client.close();
	}
};

const deleteUserByID = async (id) => {
	const client = new MongoClient(process.env.URI);
	try {
		const objID = new ObjectId(id);
		await client.connect();
		return await client
			.db("memoryspot")
			.collection("users")
			.deleteOne({ _id: objID });
	} catch (error) {
		console.log("Error while deleting.");
	} finally {
		await client.close();
	}
};

// friends
const getFriendsByUserID = async (user_id) => {
	const client = new MongoClient(process.env.URI);
	try {
		const objID = new ObjectId(user_id);
		await client.connect();
		return await client
			.db("memoryspot")
			.collection("users")
			.aggregate([
				{
					$match: { _id: objID },
				},
				{
					$project: {
						_id: 0,
						friends: 1,
					},
				},
			])
			.toArray();
	} catch (error) {
		console.log(
			"Database error in fetching the user based on the username ",
			error
		);
		console.log(error);
	} finally {
		await client.close();
	}
};

const insertFriend = async (user_id, friend_id) => {
	const client = new MongoClient(process.env.URI);
	try {
		const objID = new ObjectId(user_id);
		const objID1 = new ObjectId(friend_id);
		await client.connect();
		return await client
			.db("memoryspot")
			.collection("users")
			.updateOne(
				{ _id: objID },
				{
					$push: {
						friends: objID1,
					},
				}
			);
	} catch (error) {
		console.log(
			"Database error in fetching the user based on the username ",
			error
		);
		console.log(error);
	} finally {
		await client.close();
	}
};

const deleteFriend = async (user_id, friend_id) => {
	const client = new MongoClient(process.env.URI);
	try {
		const objID = new ObjectId(user_id);
		const objID1 = new ObjectId(friend_id);
		await client.connect();
		return await client
			.db("memoryspot")
			.collection("users")
			.updateOne(
				{ _id: objID },
				{
					$pull: {
						friends: objID1,
					},
				}
			);
	} catch (error) {
		console.log(
			"Database error in fetching the user based on the username ",
			error
		);
		console.log(error);
	} finally {
		await client.close();
	}
};

//not done
const getFriendByID = async (user_id, friend_id) => {
	const client = new MongoClient(process.env.URI);
	try {
		const objID = new ObjectId(user_id);
		const objID1 = new ObjectId(friend_id);
		await client.connect();
		return await client
			.db("memoryspot")
			.collection("users")
			.aggregate([
				{
					$match: { _id: objID },
				},
				{
					$project: {
						friends: 1,
					},
				},
			])
			.toArray();
	} catch (error) {
		console.log(
			"Database error in fetching the user based on the username ",
			error
		);
		console.log(error);
	} finally {
		await client.close();
	}
};

export {
	insertUser,
	insertFriend,
	updateUser,
	getFriendsByUserID,
	getFriendByID,
	deleteFriend,
	deleteUserByEmail,
	deleteUserByID,
	getUserByID,
	getUserByUsername,
	getUserByEmail,
};
