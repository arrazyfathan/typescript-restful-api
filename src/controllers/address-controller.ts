import {UserRequest} from "../types/user-request";
import {NextFunction, Response} from "express";
import {CreateAddressRequest, GetAddressRequest, UpdateAddressRequest} from "../models/address-model";
import {AddressService} from "../services/address-service";
import {ResponseError} from "../errors/response-error";

export class AddressController {

    static async create(req: UserRequest, res: Response, next: NextFunction) {
        try {
            if (!/^\d+$/.test(req.params.contactId)) {
                return next(new ResponseError(400, "Invalid contactId"))
            }

            const request: CreateAddressRequest = req.body as CreateAddressRequest;
            request.contact_id = Number(req.params.contactId);
            const response = await AddressService.create(req.user!, request);
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

            const getAddressRequest: GetAddressRequest = {
                id: Number(req.params.addressId),
                contact_id: Number(req.params.contactId),
            }

            const response = await AddressService.get(req.user!, getAddressRequest);
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

            const request: UpdateAddressRequest = req.body as UpdateAddressRequest;
            request.contact_id = Number(req.params.contactId);
            request.id = Number(req.params.addressId);

            const response = await AddressService.update(req.user!, request);
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

            const removeAddressRequest: GetAddressRequest = {
                id: Number(req.params.addressId),
                contact_id: Number(req.params.contactId),
            }

            await AddressService.remove(req.user!, removeAddressRequest);
            res.status(200).json({
                data: "OK",
            })
        } catch (e) {
            next(e);
        }
    }

    static async list(req: UserRequest, res: Response, next: NextFunction) {
        try {
            if (!/^\d+$/.test(req.params.contactId)) {
                return next(new ResponseError(400, "Invalid contactId"))
            }

            const contactId = Number(req.params.contactId);
            const response = await AddressService.list(req.user!, contactId);
            res.status(200).json({
                data: response,
            })
        } catch (e) {
            next(e);
        }
    }
}