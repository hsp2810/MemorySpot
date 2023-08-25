import express from "express";
const router = express.Router();
import {
	register as registeruser,
	login as loginuser,
	logout,
	login,
	register,
} from "../controller/authController.js";
import { body, check, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { Authenticate } from "../middleware/authenticate.js";

// router.route("/login").get(Authenticate).post(login);
// router.route("/register").post(register);
// router.route("/logout").get((req, res) => {

// })

router.post(
	"/register",
	// [
	// 	check("name")
	// 		.isLength({ min: 5 })
	// 		.withMessage("Name should be at least of 5 characters"),
	// 	check("email", "Enter a valid email address").not().isEmpty(),
	// 	body("email").isEmail(),
	// 	check("password")
	// 		.isAlphanumeric()
	// 		.isLength({ min: 5 })
	// 		.withMessage("Password should be at least of 5 characters"),
	// ],
	(req, res) => {
		try {
			var errors = validationResult(req);
			if (errors.errors.length === 0) {
				registeruser(req, res);
			} else {
				//errors will be printed in here
				res.status(StatusCodes.BAD_REQUEST).send(errors);
			}
		} catch (error) {
			console.log(error);
			res.send("error occured");
		}
	}
);

router.post(
	"/login",
	// [
	//   check("email", "Enter a valid email address").not().isEmpty(),
	//   body("email").isEmail(),
	//   check("password")
	//     .isLength({ min: 5 })
	//     .withMessage("Password should be at least of 5 characters"),
	// ],
	(req, res) => {
		try {
			let errors = validationResult(req);
			if (errors.errors.length === 0) {
				loginuser(req, res);
			} else {
				res.status(StatusCodes.BAD_REQUEST).send(errors);
			}
		} catch (error) {
			console.log(error);
			res.send("error occured");
		}
	}
);

//authentication route
router.get("/authenticate", Authenticate, (req, res) => {
	res.status(200).json({
		alertType: "success",
		message: "Successfully authenticated",
		homeUser: req.rootUser,
	});
});

//logout
router.get("/logout", logout);

export default router;
