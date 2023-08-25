import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

/*
  Methods: getCategories, insertCategory, updateCategory, deleteCategory, getCategoryById, getCategoryByName,
*/

const getCategories = async () => {
	const client = new MongoClient(process.env.URI);
	try {
		await client.connect();
		return await client
			.db("memoryspot")
			.collection("categories")
			.find()
			.toArray();
	} catch (error) {
		console.log(error);
	} finally {
		await client.close();
	}
};

const insertCategory = async (category_name) => {
	const client = new MongoClient(process.env.URI);
	try {
		await client.connect();
		return await client
			.db("memoryspot")
			.collection("categories")
			.insertOne({ categoryName: category_name });
	} catch (error) {
		console.log(error);
	} finally {
		await client.close();
	}
};

const getCategoryByName = async (category_name) => {
	const client = new MongoClient(process.env.URI);
	try {
		await client.connect();
		return await client
			.db("memoryspot")
			.collection("categories")
			.findOne({ categoryName: category_name });
	} catch (error) {
		console.log("Error while fetching category by Name.");
		console.log(error);
	} finally {
		await client.close();
	}
};

const getCategoryByID = async (category_id) => {
	const client = new MongoClient(process.env.URI);
	try {
		const objId = new ObjectId(category_id);
		await client.connect();
		return await client
			.db("memoryspot")
			.collection("categories")
			.findOne({ _id: objId });
	} catch (error) {
		console.log("Error while fetching category.");
		console.log(error);
	} finally {
		await client.close();
	}
};

const updateCategory = async (category_id, category_name) => {
	const client = new MongoClient(process.env.URI);
	try {
		const objId = new ObjectId(category_id);
		await client.connect();
		return await client
			.db("memoryspot")
			.collection("categories")
			.updateOne(
				{ _id: objId },
				{ $set: { categoryName: category_name } }
			);
	} catch (error) {
		console.log("Error while updating category.");
	} finally {
		await client.close();
	}
};
const deleteCategory = async (category_id) => {
	const client = new MongoClient(process.env.URI);
	const objId = new ObjectId(category_id);
	try {
		await client.connect();
		return await client
			.db("memoryspot")
			.collection("categories")
			.deleteOne({ _id: objId });
	} catch (error) {
		console.log("Error while deleting category.");
	} finally {
		await client.close();
	}
};

export {
	getCategories,
	insertCategory,
	updateCategory,
	deleteCategory,
	getCategoryByID,
	getCategoryByName,
};
