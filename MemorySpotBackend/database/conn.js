import { MongoClient } from "mongodb";

const connectDB = async (URI) => {
	const client = new MongoClient(URI);
	try {
		await client.connect();
		console.log("Successfully connected to database");
	} catch (error) {
		console.log("An error occured while connecting to database");
		console.log(error);
	} finally {
		await client.close();
	}
};
export default connectDB;
