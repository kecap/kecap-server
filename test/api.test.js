const Api = require('../api');
const test = require('supertest');

describe('api', () => {
  it('/ok', async () => {
    let api = new Api();
    api.use(require('bono/middlewares/json')());

    let resp = await test(api.callback())
      .get('/ok')
      .expect('Content-Type', /json/)
      .expect(200);

    // console.log(resp.);
  });
});
