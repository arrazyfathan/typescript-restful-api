import {Contact} from "@prisma/client";

export type ContactResponse = {
    id: number;
    first_name: string;
    last_name?: string;
    email?: string;
    phone?: string;
}

export type CreateContactRequest = {
    first_name: string;
    last_name?: string;
    email?: string;
    phone?: string;
}

export type UpdateContactRequest = {
    id: number;
    first_name: string;
    last_name?: string;
    email?: string;
    phone?: string;
}

export type SearchContactRequest = {
    name?: string;
    phone?: string;
    email?: string;
    page: number;
    size: number;
}

export function toContactResponse(contact: Contact): ContactResponse {
    return {
        id: contact.id,
        first_name: contact.first_name,
        last_name: contact.last_name || undefined,
        email: contact.email || undefined,
        phone: contact.phone || undefined,
    }
}