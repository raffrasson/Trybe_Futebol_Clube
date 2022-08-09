import { Router } from 'express';
import MatchRepo from '../repositories/matchRepo';
import TeamRepo from '../repositories/teamRepo';
import TeamService from '../services/teamService';
import MatchService from '../services/matchService';
import LBService from '../services/LBService';
import LBController from '../controllers/LBController';

const LBRouter = Router();

const lbService = new LBService(new TeamService(new TeamRepo()), new MatchService(new MatchRepo()));
const lbController = new LBController(lbService);

LBRouter.get('/', lbController.getAll);
LBRouter.get('/home', lbController.getAllHome);

export default LBRouter;
