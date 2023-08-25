import express from "express";
const router = express.Router();

import {
  addCategory,
  editCategory,
  fetchCategories,
  fetchCategoryByID,
  removeCategory,
} from "../controller/categoryController.js";
import { Authenticate, AdminAuthenticate } from "../middleware/authenticate.js";
import adminCategory from "./adminCategory.js";

// No need of admin access required
router
  .route("/")
  .get(Authenticate, fetchCategories)
  .post(Authenticate, AdminAuthenticate, addCategory);

//First need to check whether the it a admin access or not
// only admin can change the categories
router
  .route("/:id")
  .get(Authenticate, AdminAuthenticate, fetchCategoryByID)
  .put(Authenticate, AdminAuthenticate, editCategory)
  .delete(Authenticate, AdminAuthenticate, removeCategory);

export default router;
