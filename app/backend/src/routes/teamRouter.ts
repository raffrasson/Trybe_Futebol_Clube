import { Router } from 'express';
import TeamService from '../services/teamService';
import TeamRepo from '../repositories/teamRepo';
import TeamController from '../controllers/teamController';

const teamRouter = Router();

const repository = new TeamRepo();
const teamService = new TeamService(repository);
const teamController = new TeamController(teamService);

teamRouter.get('/', teamController.getAll);

export default teamRouter;
