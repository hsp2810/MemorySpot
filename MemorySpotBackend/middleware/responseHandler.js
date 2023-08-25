import { StatusCodes } from "http-status-codes";

const responseHandler = (type, status, message, res) => {
	const messageStatement = {
		type: type || "error",
		message: message || "Something went wrong!!",
		statusCode: status || StatusCodes.INTERNAL_SERVER_ERROR,
	};

	return res.status(messageStatement.statusCode).json({
		type: messageStatement.type,
		message: messageStatement.message,
	});
};

export default responseHandler;
