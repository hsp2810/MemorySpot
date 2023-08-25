import {StatusCodes} from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) =>{
    const defaultError = {
        msg: err.msg || "Something went wrong!!",
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    }

    res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware