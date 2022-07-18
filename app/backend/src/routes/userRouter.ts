import { Router } from 'express';
import LoginValidation from '../middlewares/loginValidation';
import UserController from '../controllers/userController';

const userRouter = Router();

const loginValidation = new LoginValidation();
const userController = new UserController();

userRouter.post('/', loginValidation.email, loginValidation.password, userController.login);
userRouter.get('/validate', userController.validate);

export default userRouter;
