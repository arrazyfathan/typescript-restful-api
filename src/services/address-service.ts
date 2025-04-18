import {Address, User} from "@prisma/client";
import {
    AddressResponse,
    CreateAddressRequest,
    GetAddressRequest, RemoveAddressRequest,
    toAddressResponse,
    UpdateAddressRequest
} from "../models/address-model";
import {Validation} from "../validations/validation";
import {AddressValidation} from "../validations/address-validation";
import {prismaClient} from "../application/database";
import {ContactService} from "./contact-service";
import {ResponseError} from "../errors/response-error";
import {Pageable} from "../models/page";

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

        const address = await this.checkAddressMustExist(
            requestAddress.contact_id,
            requestAddress.id,
        )

        return toAddressResponse(address);
    }

    static async checkAddressMustExist(contactId: number, addressId: number): Promise<Address> {
        const address = await prismaClient.address.findFirst({
            where: {
                id: addressId,
                contact_id: contactId
            }
        });

        if (!address) {
            throw new ResponseError(404, "Address not found");
        }

        return address;
    }

    static async update(user: User, request: UpdateAddressRequest): Promise<AddressResponse> {
        const updateRequest = Validation.validate(AddressValidation.UPDATE, request);

        await ContactService.checkContactMustExist(
            user.username,
            request.contact_id
        );

        await this.checkAddressMustExist(
            updateRequest.contact_id,
            updateRequest.id,
        )

        const address = await prismaClient.address.update({
            where: {
                id: updateRequest.id,
                contact_id: updateRequest.contact_id
            },
            data: updateRequest
        });

        return toAddressResponse(address);
    }

    static async remove(user: User, request: RemoveAddressRequest): Promise<AddressResponse> {
        const removeRequest = Validation.validate(AddressValidation.GET, request);

        await ContactService.checkContactMustExist(
            user.username,
            request.contact_id
        );

        await this.checkAddressMustExist(
            removeRequest.contact_id,
            removeRequest.id,
        );

        const address = await prismaClient.address.delete({
            where: {
                id: removeRequest.id,
            }
        });

        return toAddressResponse(address);
    }

    static async list(user: User, contactId: number): Promise<Array<AddressResponse>> {
        await ContactService.checkContactMustExist(user.username, contactId);
        const addresses = await prismaClient.address.findMany({
            where: {
                contact_id: contactId
            }
        });

        return addresses.map(address => toAddressResponse(address));
    }
}