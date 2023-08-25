import express from "express";
const router = express.Router();

import {
	addCategory,
	editCategory,
	fetchCategoryByID,
	removeCategory,
} from "../controller/categoryController.js";
import { AdminAuthenticate } from "../middleware/authenticate.js";

router.route("/").post(AdminAuthenticate, addCategory);

router
	.route("/:id")
	.put(AdminAuthenticate, editCategory)
	.delete(AdminAuthenticate, removeCategory)
	.get(AdminAuthenticate, fetchCategoryByID);

export default router;
