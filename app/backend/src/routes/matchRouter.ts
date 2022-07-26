import { Router } from 'express';
import MatchService from '../services/matchService';
import MatchRepo from '../repositories/matchRepo';
import MatchController from '../controllers/matchController';

const matchRouter = Router();

const repository = new MatchRepo();
const matchService = new MatchService(repository);
const matchController = new MatchController(matchService);

matchRouter.get('/', matchController.getAll);
matchRouter.get('/:id', matchController.getOne);

export default matchRouter;
