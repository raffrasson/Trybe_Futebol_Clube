import { Router } from 'express';
import MatchService from '../services/matchService';
import MatchRepo from '../repositories/matchRepo';
import MatchController from '../controllers/matchController';
import MatchValidation from '../middlewares/matchValidation';

const matchRouter = Router();

const matchValidation = new MatchValidation();
const repository = new MatchRepo();
const matchService = new MatchService(repository);
const matchController = new MatchController(matchService);

matchRouter.get('/', matchController.getAll);
matchRouter.post('/', matchValidation.validation, matchController.create);
matchRouter.get('/:id', matchController.getOne);
matchRouter.patch('/:id/finish', matchController.changeProgress);

export default matchRouter;
