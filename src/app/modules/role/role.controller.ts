import { Request, RequestHandler, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../lib/catchAsync";
import { roleServices } from "./role.service";


const createRole: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const result = await roleServices.createRole(req.body);
    sendResponse(res, StatusCodes.CREATED, {
        success: true,
        message: 'Role created successfully',
        data: result
    });

})

const getRoles: RequestHandler = catchAsync(async (req: Request, res: Response) => {

    const { result, meta } = await roleServices.getRoles(req.query);
    sendResponse(res, StatusCodes.OK, {
        success: true,
        message: 'Roles retrieved successfully',
        data: result,
        meta
    });

}
)

export const roleController = { createRole, getRoles }