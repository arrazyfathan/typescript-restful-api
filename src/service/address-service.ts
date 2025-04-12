import {User} from "@prisma/client";
import {AddressResponse, CreateAddressRequest, GetAddressRequest, toAddressResponse} from "../model/address-model";
import {Validation} from "../validation/validation";
import {AddressValidation} from "../validation/address-validation";
import {prismaClient} from "../application/database";
import {ContactService} from "./contact-service";
import {ResponseError} from "../error/response-error";

export class AddressService {

    static async create(user: User, request: CreateAddressRequest): Promise<AddressResponse> {
        const createRequest = Validation.validate(AddressValidation.CREATE, request);

        await ContactService.checkContactMustExist(
            user.username,
            createRequest.contact_id
        );

        const address = await prismaClient.address.create({
            data: createRequest,
        });

        return toAddressResponse(address);
    }

    static async get(user: User, request: GetAddressRequest): Promise<AddressResponse> {
        const requestAddress = Validation.validate(AddressValidation.GET, request);

        await ContactService.checkContactMustExist(
            user.username,
            request.contact_id
        );

        const address = await prismaClient.address.findFirst({
            where: {
                id: requestAddress.id,
                contact_id: requestAddress.contact_id
            }
        });

        if (!address) {
            throw new ResponseError(404, "Address not found");
        }

        return toAddressResponse(address);
    }
}