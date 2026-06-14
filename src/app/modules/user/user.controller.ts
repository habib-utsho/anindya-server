import { Request, RequestHandler, Response } from "express";
import { userServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../lib/catchAsync";


const createUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const result = await userServices.createUser(req.body);

    sendResponse(res, StatusCodes.CREATED, {
        success: true,
        message: 'User created successfully',
        data: result
    });
})

const getUsers: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const result = await userServices.getUsers();
    console.log(result);
    sendResponse(res, StatusCodes.OK, {
        success: true,
        message: 'Users retrieved successfully',
        data: result
    });
})


export const userController = { createUser, getUsers }