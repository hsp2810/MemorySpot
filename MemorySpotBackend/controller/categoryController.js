import {
	deleteCategory,
	getCategories,
	getCategoryByID,
	getCategoryByName,
	insertCategory,
	updateCategory,
} from "../database/category.js";

/*
  Methods: getCategories, insertCategory, updateCategory, deleteCategory, getCategoryById, getCategoryByName,
*/
const fetchCategories = async (req, res) => {
	try {
		const categories = await getCategories();

		if (!categories) {
			return res.status(501).json({
				type: "error",
				message: "No categries found.",
				adminAccessed: req.admin.name + ": " + req.admin.email,
			});
		}

		res.status(200).json({ type: "success", categories: categories });
	} catch (error) {}
};

const addCategory = async (req, res) => {
	try {
		const { category_name } = req.body;

		const categoryExist = await getCategoryByName(category_name);
		if (categoryExist) {
			return res.status(401).json({
				type: "error",
				message: "Category already exist",
				adminAccessed: req.admin.name + ": " + req.admin.email,
			});
		}

		const addedCategory = await insertCategory(category_name);

		if (!addedCategory) {
			return res.status(501).json({
				type: "error",
				message: "Not able to add the category properly",
				adminAccessed: req.admin.name + ": " + req.admin.email,
			});
		}

		res.status(200).json({
			type: "success",
			category: addCategory,
			message: category_name + " added as a category",
			adminAccessed: req.admin.name + ": " + req.admin.email,
		});
	} catch (error) {
		console.log("Backend error in fetching the Categories.");
	}
};

const fetchCategoryByID = async (req, res) => {
	try {
		const { id } = req.params;

		const category = await getCategoryByID(id);

		if (!category) {
			return res.status(501).json({
				type: "error",
				message: "No category found based on the ID.",
				adminAccessed: req.admin.name + ": " + req.admin.email,
			});
		}

		res.status(200).json({
			type: "success",
			message: "Category found",
			category: category,
			adminAccessed: req.admin.name + ": " + req.admin.email,
		});
	} catch (error) {
		console.log("Backend error in fetching the Categories.");
	}
};

const fetchCategoryByName = async (req, res) => {
	try {
		const { name } = req.body;

		const category = await getCategoryByName(name);

		if (!category) {
			return res.status(501).json({
				type: "error",
				message: "No category found based on the name.",
				adminAccessed: req.admin.name + ": " + req.admin.email,
			});
		}

		res.status(200).json({
			type: "success",
			category: category,
			message: "Category found",
			adminAccessed: req.admin.name + ": " + req.admin.email,
		});
	} catch (error) {
		console.log("Backend error in fetching the Categories.");
	}
};

const editCategory = async (req, res) => {
	try {
		const { id } = req.params;

		const category = await getCategoryByID(id);

		if (!category) {
			return res.status(501).json({
				type: "error",
				message: "No category found. It must exist in order to edit it",
				adminAccessed: req.admin.name + ": " + req.admin.email,
			});
		}

		const { category_name } = req.body;

		const categoryExist = await getCategoryByName(category_name);
		if (categoryExist) {
			return res.status(401).json({
				type: "error",
				message: "Category already exist.",
				adminAccessed: req.admin.name + ": " + req.admin.email,
			});
		}

		const updatedCategory = await updateCategory(id, category_name);
		if (!updatedCategory) {
			res.status(200).json({
				type: "error",
				message: "Category not updated",
				adminAccessed: req.admin.name + ": " + req.admin.email,
			});
		}

		res.status(200).json({
			type: "success",
			message: "Category updated",
			updated: updatedCategory.modifiedCount,
			adminAccessed: req.admin.name + ": " + req.admin.email,
		});
	} catch (error) {
		console.log("Backend error in fetching the Categories.");
	}
};

const removeCategory = async (req, res) => {
	try {
		const { id } = req.params;

		const category = await getCategoryByID(id);

		if (!category) {
			return res.status(501).json({
				type: "error",
				message:
					"No category found. It must exist in order to delete it",
				adminAccessed: req.admin.name + ": " + req.admin.email,
			});
		}

		const deletedCategory = await deleteCategory(id);

		if (deletedCategory.deletedCount === 0) {
			return res.status(501).json({
				type: "error",
				message: "Error in deleting the category.",
				adminAccessed: req.admin.name + ": " + req.admin.email,
			});
		}

		res.status(200).json({
			type: "success",
			message: "Category deleted successfully",
			adminAccessed: req.admin.name + ": " + req.admin.email,
		});
	} catch (error) {
		console.log("Backend error in fetching the Categories: ", error);
	}
};

export {
	fetchCategories,
	fetchCategoryByID,
	fetchCategoryByName,
	addCategory,
	editCategory,
	removeCategory,
};
