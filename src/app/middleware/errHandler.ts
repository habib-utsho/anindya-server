import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TErrorSource } from "../interface/error";
import { ZodError } from "zod";
import handleZodErr from "../errors/handleZodErr";
import { Prisma } from "../../generated/prisma/client";
import { handlePrismaInitErr, handlePrismaKnownErr, handlePrismaPanicErr, handlePrismaUnknownErr, handlePrismaValidationErr } from "../errors/handlePrismaErr";


const notFoundErrHandler = (req: Request, res: Response) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(StatusCodes.NOT_FOUND).send({
        success: false,
        message: error?.message,
        error: error
    });
};


interface CustomError extends Error {
    statusCode?: number;
}


const globalErrHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {


    let statusCode = err.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;
    let message = err.message || 'Internal Server Error';
    let errorSources: TErrorSource[] = [
        {
            path: "",
            message: err.message || "Internal Server Error"
        }
    ]
    if (err instanceof ZodError) {
        const ourErr = handleZodErr(err);
        ({ statusCode, message, errorSources } = ourErr);
    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const ourErr = handlePrismaKnownErr(err);
        ({ statusCode, message, errorSources } = ourErr);
    } else if (err instanceof Prisma.PrismaClientValidationError) {
        const ourErr = handlePrismaValidationErr(err);
        ({ statusCode, message, errorSources } = ourErr);
    } else if (err instanceof Prisma.PrismaClientInitializationError) {
        const ourErr = handlePrismaInitErr(err);
        ({ statusCode, message, errorSources } = ourErr);
    } else if (err instanceof Prisma.PrismaClientRustPanicError) {
        const ourErr = handlePrismaPanicErr(err);
        ({ statusCode, message, errorSources } = ourErr);
    } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        const ourErr = handlePrismaUnknownErr(err);
        ({ statusCode, message, errorSources } = ourErr);
    }



    res.status(statusCode).send({
        success: false,
        message,
        errorSources,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
};

export { notFoundErrHandler, globalErrHandler }