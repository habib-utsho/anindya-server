import { ZodError, ZodIssue } from "zod";
import { TGenericErrorResponse } from "../interface/error";
import { StatusCodes } from "http-status-codes";

const handleZodErr = (error: ZodError): TGenericErrorResponse => {
    const statusCode = StatusCodes.BAD_REQUEST;
    const message = `Validation failed: ${error.issues?.map((issue) => issue.path.join(".")).join(", ")}`;
    const errorSources = error.issues.map((issue: ZodIssue) => {
        return {
            path: issue.path.join("."),
            message: issue.message
        }
    });

    return {
        statusCode,
        message,
        errorSources
    };
}

export default handleZodErr;