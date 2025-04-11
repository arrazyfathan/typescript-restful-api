import {User} from "@prisma/client";
import {AddressResponse, CreateAddressRequest, toAddressResponse} from "../model/address-model";
import {Validation} from "../validation/validation";
import {AddressValidation} from "../validation/address-validation";
import {prismaClient} from "../application/database";
import {ContactService} from "./contact-service";

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
}