import { Router } from 'express';
import TeamService from '../services/teamService';
import TeamRepo from '../repositories/teamRepo';
import TeamController from '../controllers/teamController';

const teamRouter = Router();

const team = () => {
  const repository = new TeamRepo();
  const teamService = new TeamService(repository);
  const teamController = new TeamController(teamService);

  return teamController;
};

teamRouter.get('/', team().getAll);

export default teamRouter;
