import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';

describe('Adoption API', () => {
  let createdAdoptionId = null;

  it('POST /api/adoptions - debería crear una adopción', async () => {
    const res = await request(app).post('/api/adoptions').send({
      user: 'NicoTest',
      pet: 'Firulais'
    });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('_id');
    createdAdoptionId = res.body._id;
  });

  it('GET /api/adoptions - debería devolver lista de adopciones', async () => {
    const res = await request(app).get('/api/adoptions');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('DELETE /api/adoptions/:id - debería eliminar una adopción', async () => {
    const res = await request(app).delete(`/api/adoptions/${createdAdoptionId}`);
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Adopción eliminada');
  });
});
