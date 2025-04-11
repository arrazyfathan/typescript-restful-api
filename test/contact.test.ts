import supertest from "supertest";
import {app} from "../src/application/app";
import {ContactTest, UserTest} from "./test-util";
import {logger} from "../src/application/logging";

describe('POST /api/contacts', () => {

    beforeEach(async () => {
        await UserTest.create();
    })

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    })

    it('should be able to add contact',async () => {
        const response = await supertest(app)
            .post('/api/contacts')
            .set('X-API-TOKEN', 'test')
            .send({
                first_name: "Razy",
                last_name: "Doe",
                email: "test@example.com",
                phone: "010101010",
            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.first_name).toBe("Razy");
        expect(response.body.data.last_name).toBe("Doe");
        expect(response.body.data.email).toBe("test@example.com");
        expect(response.body.data.phone).toBe("010101010");
    });

    it('should reject to add new contact if data is invalid',async () => {
        const response = await supertest(app)
            .post('/api/contacts')
            .set('X-API-TOKEN', 'test')
            .send({
                first_name: "",
                last_name: "",
                email: "test",
                phone: "fsdfasdfasfasdffasfsdffasfasdfdasfs",
            });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
});

describe('GET /api/contacts', () => {

    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    })

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    })

    it('should be able get contact',async () => {
        const contact = await ContactTest.get();
        logger.debug(contact.id);
        const response = await supertest(app)
            .get(`/api/contacts/${contact.id}`)
            .set('X-API-TOKEN', 'test');

        logger.debug(response.body);

        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.first_name).toBe(contact.first_name);
        expect(response.body.data.last_name).toBe(contact.last_name);
        expect(response.body.data.email).toBe(contact.email);
        expect(response.body.data.phone).toBe(contact.phone);
    });

    it('should reject get contact if contact is not found',async () => {
        const contact = await ContactTest.get();
        logger.debug(contact.id);
        const response = await supertest(app)
            .get(`/api/contacts/${contact.id + 1}`)
            .set('X-API-TOKEN', 'test');

        logger.debug(response.body);

        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });

    it('should reject get contact if path not valid',async () => {
        const contact = await ContactTest.get();
        logger.debug(contact.id);
        const response = await supertest(app)
            .get(`/api/contacts/notvalid`)
            .set('X-API-TOKEN', 'test');

        logger.debug(response.body);

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
});