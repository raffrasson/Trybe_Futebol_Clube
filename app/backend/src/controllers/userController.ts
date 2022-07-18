import { Request, Response, NextFunction } from 'express';
// import { JwtPayload, verify } from 'jsonwebtoken';
// import fs = require('fs');
import authVal from '../middlewares/tokenValidation';
import token from '../middlewares/token';
import UserService from '../services/userService';

class UserController {
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await UserService.login(email, password);
      const generatedToken = token({ role: user.role });
      res.setHeader('authorization', generatedToken);
      const userReturn = {
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          email: user.email,
        },
        token: generatedToken,
      };
      return res.status(200).json(userReturn);
    } catch (error) {
      next(error);
    }
  };

  public validate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenData = req.headers.authorization;
      const user = await authVal(tokenData as string);
      // console.log(user);
      return res.status(200).json({ role: user.role });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
