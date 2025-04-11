import {Request, Response, NextFunction} from "express";
import {CreateUserRequest, LoginUserRequest, UpdateUserRequest} from "../model/user-model";
import {UserService} from "../service/user-service";
import {UserRequest} from "../type/user-request";
import {CreateContactRequest, UpdateContactRequest} from "../model/contact-model";
import {ContactService} from "../service/contact-service";
import {logger} from "../application/logging";
import {ResponseError} from "../error/response-error";

export class ContactController {

    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateContactRequest = req.body as CreateContactRequest;
            const response = await ContactService.create(req.user!, request);
            res.status(200).json({
                data: response,
            })
        } catch (e) {
            next(e);
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {

            if (!/^\d+$/.test(req.params.contactId)) {
                return next(new ResponseError(400, "Invalid contactId"))
            }

            const contactId = Number(req.params.contactId);
            const response = await ContactService.get(req.user!, contactId);
            res.status(200).json({
                data: response,
            })
        } catch (e) {
            next(e);
        }
    }

    static async update(req: UserRequest, res: Response, next: NextFunction) {
        try {

            if (!/^\d+$/.test(req.params.contactId)) {
                return next(new ResponseError(400, "Invalid contactId"))
            }

            const contactId = Number(req.params.contactId);
            const request: UpdateContactRequest = req.body as UpdateContactRequest;
            request.id = contactId;
            const response = await ContactService.update(req.user!, request);
            res.status(200).json({
                data: response,
            })
        } catch (e) {
            next(e);
        }
    }

    static async remove(req: UserRequest, res: Response, next: NextFunction) {
        try {

            if (!/^\d+$/.test(req.params.contactId)) {
                return next(new ResponseError(400, "Invalid contactId"))
            }

            const contactId = Number(req.params.contactId);
            await ContactService.remove(req.user!, contactId);
            res.status(200).json({
                data: "OK",
            })
        } catch (e) {
            next(e);
        }
    }
}