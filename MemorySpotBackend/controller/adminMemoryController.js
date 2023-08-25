import {
    getMemoryById,
    getMemoriesByUserId,
    getAllMemories,
    getMemoriesByDate,
    insertMemory,
    updateMemory,
    deleteMemory,
    deleteAllMemoriesByUserID,
    memoryApproval,
} from "../database/memory.js";
import adminAuthenticate from "../middleware/adminAuthenticate.js";
import errorHandlerMiddleware from "../middleware/errorHandlerMiddleware.js";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataURI.js";

// Done
export const fetchMemoryByID = async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res
				.status(401)
				.json({ message: "Didn't got proper memory ID" });
		}

		console.log("Memory ID is: ", id);

		const memory = await getMemoryById(id);

		if (!memory) {
			return res
				.status(501)
				.json({ message: "Not memory found based on the ID" });
		}

		res.status(200).json({ message: "Memory found", memory: memory });
	} catch (error) {
		console.log("Backend error in fetching the memory by ID:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const fetchMemoriesByUserID = async (req, res) => {
	try {
		const { id } = req.params;
		const memories = await getMemoriesByUserId(id);

		if (memories.length === 0) {
			return res.status(501).json({
				type: "error",
				message: "No memories found based on the user id",
			});
		}
		res.status(200).json({ type: "success", memories: memories });
	} catch (error) {
		console.log(
			"Backend error in fetching the memories by user ID:",
			error
		);
		res.status(500).json({ message: "Internal server error" });
	}
};

//done
export const addMemory = async (req, res) => {
	try {
		// Getting the audio/video file
		const memoryfile = req.file;

		if (!memoryfile) {
			return res
				.status(401)
				.json({ type: "error", message: "File not found" });
		}

		// Parsing
		const fileUri = getDataUri(memoryfile);

		const {
			title,
			caption,
			memoryRadius,
			latitude,
			longitude,
			category,
			owner,
		} = req.body;

		// Adding the file to cloudinary
		const uploadedImage = await cloudinary.v2.uploader.upload(
			fileUri.content,
			{ resource_type: "video" }
		);

		const addedMemory = await insertMemory({
			memoryfile: {
				public_id: uploadedImage.public_id,
				url: uploadedImage.secure_url,
			},
			title,
			caption,
			memoryRadius,
			latitude,
			longitude,
			category,
			owner,
		});

		if (!addedMemory) {
			return res.status(501).json({
				alertType: "error",
				message: "Not able to add the memory",
			});
		}
		res.status(201).json({
			alertType: "success",
			message: "Memory Added successfully",
			addedMemory: addedMemory.insertedId,
		});
	} catch (error) {
		console.log("Backend error in adding the memory:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

//not done
export const editMemory = async (req, res) => {
	console.log("Going to edit");
	try {
		const {
			memoryfileid,
			id,
			title,
			caption,
			memoryRadius,
			latitude,
			longitude,
			category,
			owner,
		} = req.body;

		// Getting the memory id
		console.log(memoryfileid);

		// Destroying the video file
		const deleted = await cloudinary.v2.uploader.destroy(memoryfileid, {
			resource_type: "video",
		});

		if (deleted.result === "not found") {
			console.log("Priting the deleted: ", deleted);
		}

		// Uploading the updated file by the user
		const memoryfile = req.file;

		if (!memoryfile) {
			return res
				.status(401)
				.json({ type: "error", message: "File not found" });
		}

		// Parsing
		const fileUri = getDataUri(memoryfile);
		const uploadedImage = await cloudinary.v2.uploader.upload(
			fileUri.content,
			{ resource_type: "video" }
		);

		const result = await updateMemory({
			memoryfile: {
				public_id: uploadedImage.public_id,
				url: uploadedImage.secure_url,
			},
			id,
			title,
			caption,
			memoryRadius,
			latitude,
			longitude,
			category,
			owner,
		});

		if (!result) {
			return res
				.status(501)
				.json({ type: "error", message: "No memories found" });
		}

		res.status(200).json({
			message: "Memory updated successfully",
			updatedCount: result.modifiedCount,
		});
	} catch (error) {
		console.log("Backend error in updating the memory:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

//done
export const removeMemory = async (req, res) => {
	try {
		const { id } = req.params;

		const memory = await getMemoryById(id);

		if (memory.length === 0) {
			return res.status(401).json({
				type: "error",
				message: "Memory don't exist based on the ID.",
			});
		}

		//First need to delete the file from cloudinary
		await cloudinary.v2.uploader.destroy(memory[0].memoryfile.public_id, {
			resource_type: "video",
		});

		const result = await deleteMemory(id);

		if (result) {
			res.status(200).json({
				message: "Memory deleted successfully",
				result,
			});
		} else {
			res.status(404).json({ message: "Memory not found" });
		}
	} catch (error) {
		console.log("Backend error in deleting the memory:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

//friends not done
export const fetchFriendsMemories = async (req, res) => {
	try {
		//take the id from the Authenticate
	} catch (error) {
		console.log("Backend error in deleting the memory:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};
// fetch all memories from memories collection
export const fetchAllMemories = async (req, res) => {
    try {
      const memories = await getAllMemories();
      if (memories.length === 0) {
        return res.status(404).json({ message: "No memories found" });
      }
      res.status(200).json({ memories });
    } catch (error) {
      console.log("Backend error in fetching all memories:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  //remove all memories by user ID
  export const removeAllMemoriesByUserID = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await deleteAllMemoriesByUserID(id);
      if (result.deletedCount === 0) {
        return res.status(404).json({
          type: "error",
          message: "No memories found based on the user id",
        });
      }
      res
        .status(200)
        .json({ type: "success", message: "Memories removed successfully" });
    } catch (error) {
      console.log("Backend error in removing memories:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  //Approval of the posted memory, either declined to be posted or approved if post goes against the policy
  export const memoryAcceptance = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await memoryApproval(id);
      if (!result) {
        return res
          .status(404)
          .json({ type: "error", message: "No memories found" });
      }
      res
        .status(200)
        .json({ type: "success", message: "Memory approved successfully" });
    } catch (error) {
      console.log("Backend error in approving memory:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  //fetch memory by DATE although , we dont have date in memory collection
  export const fetchMemoryByDATE = async (req, res) => {
	try {
		// Retrieve the memory with the specified date from the database
		// Send the memory as a response
	} catch (error) {
		console.log("Backend error in fetching memory by date:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

