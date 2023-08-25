import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { getUserByID } from "../database/user.js";
config();

export const Authenticate = async (req, res, next) => {
	const token = req.cookies.authCookies;

	try {
		if (!token) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ alert: { type: "error", message: "No token found" } });
		}

		const verifiedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);

		//if not authenticated send the request back
		if (!verifiedUser) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				alert: { type: "error", message: "Token is not valid" },
			});
		}

		const user = await getUserByID(verifiedUser._id);

		if (!user) {
			return res.status(400).json({
				alert: {
					type: "error",
					message: "User not found based on the token",
				},
			});
		}

		req.rootUser = user;
		req.rootID = verifiedUser._id;
		next();
		//authenticated then doing the backend stuff
	} catch (error) {
		//USER NOT AUTHENTICATED
		console.log("cannot authenticate");
		res.status(StatusCodes.UNAUTHORIZED);
	}
};

export const AdminAuthenticate = (req, res, next) => {
	const isAdmin = req.rootUser.isAdmin;
	if (!isAdmin) {
		return res
			.status(401)
			.json({
				alert: {
					type: "error",
					message: "User logined is not an admin",
				},
			});
	}
	req.admin = req.rootUser;
	req.adminID = req.rootID;
	next();
};
