import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/teamService';
import TeamRepo from '../repositories/teamRepo';
import TeamController from '../controllers/teamController';
import 'dotenv/config';
import tokenValid from './verifyToken';

export default class matchValidation {
  repository = new TeamRepo();
  teamService = new TeamService(this.repository);
  teamController = new TeamController(this.teamService);

  public validation = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = await req.body;
    const teams = await this.teamService.list();
    const ids = teams.map((team) => team.id);
    const tokenData = await req.headers.authorization;
    const payload = await tokenValid(tokenData as string);
    console.log(typeof payload);
    if (homeTeam === awayTeam) {
      res.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    if (ids.includes(Number(homeTeam) || Number(awayTeam)) === false) {
      res.status(404)
        .json({ message: 'There is no team with such id!' });
    }
    if (!payload) {
      res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  };
}
