import agent = require('supertest');

module.exports = (app: any) => ({
  get: async (url: string) => agent(app).get(url),
  getWithRequestBody: (data: any) => ({
    to: async (url: string) => agent(app).get(url).send(data),
  }),
  post: (data: any) => ({
    to: async (url: string) => agent(app).post(url).send(data),
  }),
});