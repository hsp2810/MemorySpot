import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

/*
    Memory DB fields: _id, title, caption, file, views, owner.
	Memory DB methods: 
*/

// First finds the memory based on the id and then attaches the owner's credentials.
const getMemoryById = async (memory_id) => {
	const client = new MongoClient(process.env.URI);
	try {
		const objID = new ObjectId(memory_id);
		console.log(objID);
		await client.connect();
		return await client
			.db("memoryspot")
			.collection("memories")
			.aggregate([
				{
					$match: { _id: objID },
				},
				{
					$lookup: {
						from: "categories",
						localField: "category",
						foreignField: "_id",
						as: "category",
					},
				},
				{
					$lookup: {
						from: "users",
						localField: "owner",
						foreignField: "_id",
						as: "owner",
					},
				},
				{
					$project: {
						"owner.password": 0,
						"owner.friends": 0,
						"owner.isAdmin": 0,
					},
				},
			])
			.toArray();
	} catch (error) {
		console.log("Datbase error .");
		console.log(error);
	} finally {
		await client.close();
	}
};

//not done
const getFriendsMemories = async () => {
	const client = new MongoClient(process.env.URI);
	try {
		const objID = new ObjectId(user_id);
		await client.connect();
		return await client
			.db("memoryspot")
			.collection("memories")
			.aggregate([
				{
					$match: { owner: objID },
				},
				{
					$lookup: {
						from: "users",
						localField: "owner",
						foreignField: "_id",
						as: "owner",
					},
				},
				{
					$project: {
						_id: 1,
						username: 1,
						fName: 1,
						lName: 1,
					},
				},
			])
			.toArray();
	} catch (error) {
		console.log("Datbase error .");
		console.log(error);
	} finally {
		await client.close();
	}
};

const getMemoriesByUserID = async (user_id) => {
	const client = new MongoClient(process.env.URI);
	try {
		const objID = new ObjectId(user_id);
		console.log(objID);
		await client.connect();
		return await client
			.db("memoryspot")
			.collection("memories")
			.aggregate([
				{
					$match: { owner: objID },
				},
				{
					$lookup: {
						from: "categories",
						localField: "category",
						foreignField: "_id",
						as: "category",
					},
				},
				{
					$lookup: {
						from: "users",
						localField: "owner",
						foreignField: "_id",
						as: "owner",
					},
				},
				{
					$project: {
						"owner.password": 0,
						"owner.friends": 0,
						"owner.isAdmin": 0,
					},
				},
			])
			.toArray();
	} catch (error) {
		console.log("Datbase error .");
		console.log(error);
	} finally {
		await client.close();
	}
};

//Pass this function user_id and it will return you the memories uploaded in the past 24 hrs by the user.
const getMemoriesLast24Hrs = async (user_id) => {
	const client = new MongoClient(process.env.URI);
	try {
		const objID = new ObjectId(user_id);
		await client.connect();
		return await client
			.db("memoryspot")
			.collection("memories")
			.aggregate([
				{
					$match: { owner: objID },
				},
				{
					$match: { date: objID },
				},
				{
					$lookup: {
						from: "users",
						localField: "owner",
						foreignField: "_id",
						as: "owner",
					},
				},
				{
					$project: {
						_id: 1,
						username: 1,
						fName: 1,
						lName: 1,
					},
				},
			])
			.toArray();
	} catch (error) {
		console.log("Datbase error .");
		console.log(error);
	} finally {
		await client.close();
	}
};

const insertMemory = async ({
	memoryfile,
	title,
	caption,
	memoryRadius,
	latitude,
	longitude,
	address,
	category,
	owner,
	uploadedDate,
}) => {
	const client = new MongoClient(process.env.URI);
	try {
		const objID1 = new ObjectId(category);
		const objID2 = new ObjectId(owner);
		await client.connect();
		return await client.db("memoryspot").collection("memories").insertOne({
			memoryfile,
			title,
			caption,
			memoryRadius,
			latitude,
			longitude,
			address,
			category: objID1,
			owner: objID2,
			uploadedDate,
		});
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

const updateMemory = async (memory) => {
	const client = new MongoClient(process.env.URI);
	try {
		const objId = new ObjectId(memory.id);
		await client.connect();
		return await client
			.db("memoryspot")
			.collection("memories")
			.updateOne({ _id: objId }, { $set: memory });
	} catch (error) {
		console.log("Error while updating user.");
	} finally {
		await client.close();
	}
};

const deleteMemory = async (memory_id) => {
	const client = new MongoClient(process.env.URI);
	try {
		const objId = new ObjectId(memory_id);
		await client.connect();
		return await client
			.db("memoryspot")
			.collection("memories")
			.deleteOne({ _id: objId });
	} catch (error) {
		console.log("Error while deleting.");
	} finally {
		await client.close();
	}
};

/*const getAllMemories = async () => {
	const client = new MongoClient(process.env.URI);
	try {
		await client.connect();
		return await client.db("memoryspot").collection("memories").find().toArray();
	} catch (error) {
		console.log("Database error in fetching all memories.");
		console.log(error);
	} finally {
		await client.close();
	}
};*/

/*const deleteAllMemoriesByUserID = async (user_id) => {
	const client = new MongoClient(process.env.URI);
	try {
		const objId = new ObjectId(user_id);
		await client.connect();
		return await client
			.db("memoryspot")
			.collection("memories")
			.deleteMany({ owner: objId });
	} catch (error) {
		console.log("Error while deleting memories.");
		console.log(error);
	} finally {
		await client.close();
	}
};*/

/*const memoryApproval = async (memory_id) => {
	const client = new MongoClient(process.env.URI);
	try {
		const objId = new ObjectId(memory_id);
		await client.connect();
		return await client
			.db("memoryspot")
			.collection("memories")
			.updateOne({ _id: objId }, { $set: { isApproved: true } });
	} catch (error) {
		console.log("Error while approving memory.");
		console.log(error);
	} finally {
		await client.close();
	}
};*/

export const insertMemoryToBank = async (user_id, memory_id) => {
	try {
		const client = new MongoClient(process.env.URI);
		const userID = new ObjectId(user_id);
		const memoryID = new ObjectId(memory_id);
		return await client.db("memoryspot").collection("saved").insertOne({
			owner: userID,
			memory: memoryID,
		});
	} catch (error) {
		console.log("Database error in saving the post", error);
	}
};

export const getMemoryFromBank = async (user_id, memory_id) => {
	try {
		const client = new MongoClient(process.env.URI);
		const userID = new ObjectId(user_id);
		const memoryID = new ObjectId(memory_id);
		return await client.db("memoryspot").collection("saved").findOne({
			owner: userID,
			memory: memoryID,
		});
	} catch (error) {
		console.log("Database error in saving the post");
	}
};

//done
export const getMemoriesFromBank = async (user_id) => {
	try {
		const client = new MongoClient(process.env.URI);
		const userID = new ObjectId(user_id);
		const aggregate = await client
			.db("memoryspot")
			.collection("saved")
			.aggregate([
				{
					$match: { owner: userID },
				},
				{
					$lookup: {
						from: "memories",
						localField: "memory",
						foreignField: "_id",
						as: "memory",
					},
				},
				{
					$lookup: {
						from: "users",
						localField: "memory.owner",
						foreignField: "_id",
						as: "owner",
					},
				},
				{
					$project: {
						"owner.password": 0,
						"owner.friends": 0,
					},
				},
			])
			.toArray();
		return aggregate;
	} catch (error) {
		console.log("Database error in saving the post");
	}
};

export {
	getMemoryById,
	getMemoriesByUserID,
	insertMemory,
	updateMemory,
	deleteMemory,
};
