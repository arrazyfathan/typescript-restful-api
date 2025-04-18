import {Request, Response, NextFunction} from "express";
import {CreateUserRequest, LoginUserRequest, UpdateUserRequest} from "../models/user-model";
import {UserService} from "../services/user-service";
import {UserRequest} from "../types/user-request";
import {CreateContactRequest, SearchContactRequest, UpdateContactRequest} from "../models/contact-model";
import {ContactService} from "../services/contact-service";
import {logger} from "../application/logging";
import {ResponseError} from "../errors/response-error";

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

    static async search(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: SearchContactRequest = {
                name: req.query.name as string,
                email: req.query.email as string,
                phone: req.query.phone as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10,
            }

            const response = await ContactService.search(req.user!, request);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
}