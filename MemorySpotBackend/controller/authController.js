import { StatusCodes } from "http-status-codes";
import {
	insertUser,
	getUserByEmail,
	getUserByUsername,
} from "../database/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const register = async (req, res) => {
	try {
		const { username, name, email, password } = req.body;

		const checkedEmail = await getUserByEmail(email);
		if (checkedEmail) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				alertType: "error",
				message: "User with same email already exists",
			});
		}

		const checkedUsername = await getUserByUsername(username);
		if (checkedUsername) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				alertType: "error",
				message: "Username already acquired. Try a different one.",
			});
		}

		// registering the user if email and username don't confict
		const salt = await bcrypt.genSalt(10);
		const user = {
			username: username,
			name: name,
			email: email,
			password: await bcrypt.hash(password, salt),
			friends: [],
			isActive: true,
		};
		const insertedUser = await insertUser(user);
		if (!insertedUser) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				alertType: "error",
				message: "Error occured while registering the user",
			});
		}
		res.status(StatusCodes.OK).json({
			alert: {
				type: "success",
				message: "Successfully Registered. Now, you are good to login",
			},
			registeredUser: insertedUser,
		});
	} catch (error) {
		console.log("error was encountered: ", error);
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await getUserByEmail(email);

		if (!user) {
			return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
				alertType: "error",
				message:
					"Email doesn't exist. Please enter correct credentials",
			});
		}

		bcrypt.compare(password, user.password, (err, result) => {
			console.log("Result: ", result);
			if (!result) {
				return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
					alertType: "error",
					message: "Please enter correct credentials",
				});
			}

			const token = jwt.sign(
				{ _id: user._id },
				process.env.JWT_SECRET_KEY,
				{
					noTimestamp: true,
					expiresIn: process.env.JWT_LIFETIME,
				}
			);

			res.cookie("authCookies", token, {
				expires: new Date(Date.now() + 90000000000),
				httpOnly: true,
			});

			res.status(StatusCodes.OK).json({
				alertType: "success",
				message: "Login Successful",
				token,
				homeUser: user,
			});
		});
	} catch (error) {
		console.log("Backend error in login the user");
	}
};

export const logout = async (req, res) => {
	try {
		if (!req.cookies.authCookies) {
			return res.status(400).json({ message: "Cookies doesn't exists" });
		} // console.log(req.cookies.authCookies);
		res.clearCookie("authCookies");
		res.status(200).json({
			alertType: "success",
			message: "Cookies has been cleared. Redirecting back to login page",
		});
	} catch (error) {
		console.log(error);
	}
};
