const request = require('supertest');
const app = require('../server.js'); // Adjust this path to point to your Express app
const Test = require('supertest/lib/test.js');

describe('GET /api/product/get:id', () => {
    it('Valid id: product found', async () => {
        const response = await request(app).get('/api/product/get/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.id).toBeDefined();
        expect(typeof response.body.id).toBe(`number`);
        expect(response.body.title).toBeDefined();
        expect(typeof response.body.title).toBe(`string`);
    })

    test('Invalid id: product found', async () => {
        const response = await request(app).get('/api/product/get/123468');
        expect(response.statusCode).toBe(400);
        expect(response.error).toBeDefined();
        expect(response.text).toBe("id  is not exist");

    })
    test('Invalid id: product found', async () => {
        const response = await request(app).get('/api/product/get/-1');
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("id  is not exist");

    })
    test('Invalid id: product found', async () => {
        const response = await request(app).get('/api/product/get/jdsfgbj');
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("id  is not exist");

    })
});
//addProduct
describe('POST/api/product/add', () => {
    it('Valid fields: product added', async () => {
        const data =  {
            title: 'test product',
            price: 13.5,
            description: 'lorem ipsum set',
            image: 'https://i.pravatar.cc',
            category: 'electronic'
        }
        const response = await request(app).post('/api/product/add').send(data);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(typeof response.body).toBe("object");
    })
    
    it('Invalid fields: product added', async () => {
        const data =  {
            title: 'test product',
            price: 13.5,
            description: 'lorem ipsum set',
        }
        const response = await request(app).post('/api/product/add').send(data);
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("Missing required fields");
    });

    it('Invalid fields: product added', async () => {
        const data =  {
        }
        const response = await request(app).post('/api/product/add').send(data);
        expect(response.statusCode).toBe(400);
        expect(response.body).toBeDefined();
    });
});

























