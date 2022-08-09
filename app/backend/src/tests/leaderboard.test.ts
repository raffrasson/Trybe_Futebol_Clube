import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/team';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('tests route /leaderboard', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves([
        {
          "id": 1,
          "teamName": "Avaí/Kindermann"
        },
        {
          "id": 2,
          "teamName": "Bahia"
        },
        {
          "id": 3,
          "teamName": "Botafogo"
        },
        {
          "id": 4,
          "teamName": "Corinthians"
        },
        {
          "id": 5,
          "teamName": "Cruzeiro"
        },
        {
          "id": 6,
          "teamName": "Ferroviária"
        },
        {
          "id": 7,
          "teamName": "Flamengo"
        },
        {
          "id": 8,
          "teamName": "Grêmio"
        },
        {
          "id": 9,
          "teamName": "Internacional"
        },
        {
          "id": 10,
          "teamName": "Minas Brasília"
        },
        {
          "id": 11,
          "teamName": "Napoli-SC"
        },
        {
          "id": 12,
          "teamName": "Palmeiras"
        },
        {
          "id": 13,
          "teamName": "Real Brasília"
        },
        {
          "id": 14,
          "teamName": "Santos"
        },
        {
          "id": 15,
          "teamName": "São José-SP"
        },
        {
          "id": 16,
          "teamName": "São Paulo"
        }
      ] as Team[]);
  });

  afterEach(()=>{
    (Team.findAll as sinon.SinonStub).restore();
  })

  it('returns an array of objects', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard')
       .send()

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    chaiHttpResponse.body.forEach((element: string)=> {
      expect(element).to.be.an('object')
    });;
  });

  it('each object has properties "name","totalPoints","totalGames",  "totalVictories",  "totalDraws",  "totalLosses",  "goalsFavor",  "goalsOwn",  "goalsBalance",  "efficiency"3', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard')
       .send()


    chaiHttpResponse.body.forEach((element: string)=> {
      expect(element).to.have.property('name');
      expect(element).to.have.property('totalPoints');
      expect(element).to.have.property('totalGames');
      expect(element).to.have.property('totalVictories');
      expect(element).to.have.property('totalDraws');
      expect(element).to.have.property('totalLosses');
      expect(element).to.have.property('goalsFavor');
      expect(element).to.have.property('goalsOwn')
      expect(element).to.have.property('goalsBalance')
      expect(element).to.have.property('efficiency')
    });
  });
})
