import {UserRequest} from "../type/user-request";
import {NextFunction, Response} from "express";
import {CreateAddressRequest} from "../model/address-model";
import {AddressService} from "../service/address-service";
import {ResponseError} from "../error/response-error";

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
}