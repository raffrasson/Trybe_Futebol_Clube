import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('tests route /login', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
            id: 1,
            username: "Admin",
            role: "admin",
            email: "admin@admin.com",
            password: '$2a$12$TSo.vvyv9kI6Y2AwBkqma.cSWlDOhqG.nnh2AKfmLcEgts4RFjms6',
          } as User);
  });

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('is possible to log in sucessfully', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(
        {
          email: "admin@admin.com",
          password: "secret_admin"
          }
       )

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('user');
    expect(chaiHttpResponse.body).to.have.property('token');
  });


  it('is impossible to log in without an email', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(
        {
          password: "secret_admin"
          }
       )

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
  });

  it('is impossible to log in without a password', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(
        {
          email: "admin@admin.com"
          }
       )

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
  });
});


describe('No user found to login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(User, "findOne")
      .resolves();
  });

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })


  it('is impossible to log in without a valid email', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(
        {
          email: "admin@admi.com",
          password: "secret_admin"
          }
       )
  
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
  });

  it('is impossible to log in without a valid password', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(
        {
          email: "admin@admin.com",
          password: "wrong pass"
          }
       )
  
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
  });
});

describe('tests route /login/validate', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(User, "findOne")
      .resolves();
  });

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })


  it('is impossible to log in without a valid email', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(
        {
          email: "admin@admi.com",
          password: "secret_admin"
          }
       )
  
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
  });

  it('is impossible to log in without a valid password', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(
        {
          email: "admin@admin.com",
          password: "wrong pass"
          }
       )
  
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
  });
})
