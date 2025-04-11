import supertest from "supertest";
import {app} from "../src/application/app";
import {ContactTest, UserTest} from "./test-util";
import {logger} from "../src/application/logging";
import {date} from "zod";

describe('POST /api/contacts', () => {

    beforeEach(async () => {
        await UserTest.create();
    })

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    })

    it('should be able to add contact', async () => {
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

    it('should reject to add new contact if data is invalid', async () => {
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

    it('should be able get contact', async () => {
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

    it('should reject get contact if contact is not found', async () => {
        const contact = await ContactTest.get();
        logger.debug(contact.id);
        const response = await supertest(app)
            .get(`/api/contacts/${contact.id + 1}`)
            .set('X-API-TOKEN', 'test');

        logger.debug(response.body);

        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });

    it('should reject get contact if path not valid', async () => {
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

describe('PUT /api/contacts/:contactId', () => {

    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    })

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    })

    it('should be able to update contact', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(app)
            .put(`/api/contacts/${contact.id}`)
            .set('X-API-TOKEN', 'test')
            .send({
                first_name: "Han",
                last_name: "Samu",
                email: "test@example.com",
                phone: "010101010",
            });

        logger.debug(response.body);

        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(contact.id);
        expect(response.body.data.first_name).toBe("Han");
        expect(response.body.data.last_name).toBe("Samu");
        expect(response.body.data.email).toBe("test@example.com");
        expect(response.body.data.phone).toBe("010101010");
    })

    it('should reject update contact if request is invalid', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(app)
            .put(`/api/contacts/${contact.id}`)
            .set('X-API-TOKEN', 'test')
            .send({
                first_name: "",
                last_name: "",
                email: "test",
                phone: "salahhhhhhhh",
            });

        logger.debug(response.body);

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })

})

describe('DELETE /api/contacts/:contactId', () => {

    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    })

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    })

    it('should be able to delete contact', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(app)
            .delete(`/api/contacts/${contact.id}`)
            .set('X-API-TOKEN', 'test');

        logger.debug(response.body);

        expect(response.status).toBe(200);
        expect(response.body.data).toBe("OK");
    })


    it('should reject delete contact if id is not found', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(app)
            .delete(`/api/contacts/${contact.id + 1}`)
            .set('X-API-TOKEN', 'test');

        logger.debug(response.body);

        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    })

    it('should reject delete contact if id is not valid', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(app)
            .delete(`/api/contacts/${contact.id} not valid`)
            .set('X-API-TOKEN', 'test');

        logger.debug(response.body);

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    })

})

describe('GET /api/contacts', () => {

    beforeEach(async () => {
        await UserTest.create();
        await ContactTest.create();
    })

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    })

    it('should be able to search contact', async () => {
        const response = await supertest(app)
            .get('/api/contacts')
            .set('X-API-TOKEN', 'test');

        logger.debug(response.body);

        expect(response.status).toBe(200);
        expect(response.body.data.length).toBeGreaterThan(0);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    });

    it('should be able to search contact with query name', async () => {
        const response = await supertest(app)
            .get('/api/contacts')
            .query({name: 'test'})
            .set('X-API-TOKEN', 'test');

        logger.debug(response.body);

        expect(response.status).toBe(200);
        expect(response.body.data.length).toBeGreaterThan(0);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    });

    it('should be able to search contact with query email', async () => {
        const response = await supertest(app)
            .get('/api/contacts')
            .query({email: 'mail'})
            .set('X-API-TOKEN', 'test');

        logger.debug(response.body);

        expect(response.status).toBe(200);
        expect(response.body.data.length).toBeGreaterThan(0);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    });

    it('should be able to search contact with query phone', async () => {
        const response = await supertest(app)
            .get('/api/contacts')
            .query({phone: '666'})
            .set('X-API-TOKEN', 'test');

        logger.debug(response.body);

        expect(response.status).toBe(200);
        expect(response.body.data.length).toBeGreaterThan(0);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    });


    it('should be able to search contact with no result', async () => {
        const response = await supertest(app)
            .get('/api/contacts')
            .query({name: 'salah'})
            .set('X-API-TOKEN', 'test');

        logger.debug(response.body);

        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(0);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(0);
        expect(response.body.paging.size).toBe(10);
    });

    it('should be able to search contact with paging', async () => {
        const response = await supertest(app)
            .get('/api/contacts')
            .query({page: 2, size: 1})
            .set('X-API-TOKEN', 'test');

        logger.debug(response.body);

        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(0);
        expect(response.body.paging.current_page).toBe(2);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(1);
    });

})