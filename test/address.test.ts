import {AddressTest, ContactTest, UserTest} from "./test-util";
import supertest from "supertest";
import {app} from "../src/application/app";
import {logger} from "../src/application/logging";

describe('POST /api/contacts/:contactId/addresses', () => {

    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    })

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    })

    it('should be able to add address', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(app)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set('X-API-TOKEN', 'test')
            .send({
                street: "Jl. Soekarno Hatta",
                city: "Jakarta Pusat",
                province: "DKI Jakarta",
                country: "Indonesia",
                postal_code: "12345"
            });

        logger.debug(response.body);

        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.street).toBe("Jl. Soekarno Hatta");
        expect(response.body.data.city).toBe("Jakarta Pusat");
        expect(response.body.data.province).toBe("DKI Jakarta");
        expect(response.body.data.country).toBe("Indonesia");
        expect(response.body.data.postal_code).toBe("12345");
    })

    it('should reject add address if request is not valid', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(app)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set('X-API-TOKEN', 'test')
            .send({
                street: "Jl. Soekarno Hatta",
                city: "Jakarta Pusat",
                province: "",
                country: "Indonesia",
                postal_code: "12345"
            });

        logger.debug(response.body);

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })

    it('should reject add address if contact not found', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(app)
            .post(`/api/contacts/${contact.id + 1}/addresses`)
            .set('X-API-TOKEN', 'test')
            .send({
                street: "Jl. Soekarno Hatta",
                city: "Jakarta Pusat",
                province: "DKI Jakarta",
                country: "Indonesia",
                postal_code: "12345"
            });

        logger.debug(response.body);

        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })
});

describe('GET /api/contacts/:contactId/addresses/:addressId', () => {

    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
        await AddressTest.create();
    })

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    })

    it('should be able to get address', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(app)
            .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set('X-API-TOKEN', 'test')

        logger.debug(response.body);

        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.street).toBe(address.street);
        expect(response.body.data.city).toBe(address.city);
        expect(response.body.data.province).toBe(address.province);
        expect(response.body.data.postal_code).toBe(address.postal_code);
        expect(response.body.data.country).toBe(address.country);
    })

    it('should reject get address if address is not found', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(app)
            .get(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
            .set('X-API-TOKEN', 'test')

        logger.debug(response.body);

        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })

    it('should reject get address if contact is not found', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(app)
            .get(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
            .set('X-API-TOKEN', 'test')

        logger.debug(response.body);

        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })
})

describe('PUT /api/contacts/:contactId/addresses/:addressId', () => {

    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
        await AddressTest.create();
    })

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    })

    it('should be able to update address', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(app)
            .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set('X-API-TOKEN', 'test')
            .send({
                street: "Jl. Soekarno Hatta",
                city: "Jakarta Pusat",
                province: "DKI Jakarta",
                country: "Indonesia",
                postal_code: "12345"
            })

        logger.debug(response.body);

        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(address.id);
        expect(response.body.data.street).toBe("Jl. Soekarno Hatta");
        expect(response.body.data.city).toBe("Jakarta Pusat");
        expect(response.body.data.province).toBe("DKI Jakarta");
        expect(response.body.data.postal_code).toBe("12345");
        expect(response.body.data.country).toBe("Indonesia");
    })

    it('should reject update address if request data not valid', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(app)
            .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set('X-API-TOKEN', 'test')
            .send({
                street: "Jl. Soekarno Hatta",
                city: "Jakarta Pusat",
                province: "DKI Jakarta",
                country: "",
                postal_code: ""
            })

        logger.debug(response.body);

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })

    it('should reject update address if address is not found', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(app)
            .put(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
            .set('X-API-TOKEN', 'test')
            .send({
                street: "Jl. Soekarno Hatta",
                city: "Jakarta Pusat",
                province: "DKI Jakarta",
                country: "Indonesia",
                postal_code: "12345"
            })

        logger.debug(response.body);

        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })

    it('should reject update address if contact is not found', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(app)
            .put(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
            .set('X-API-TOKEN', 'test')
            .send({
                street: "Jl. Soekarno Hatta",
                city: "Jakarta Pusat",
                province: "DKI Jakarta",
                country: "Indonesia",
                postal_code: "12345"
            })

        logger.debug(response.body);

        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })
})