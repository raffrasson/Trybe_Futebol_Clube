import { NextFunction, Request, Response } from 'express';

export default class loginValidation {
  public email = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = await req.body;
    if (!email) return res.status(400).json({ message: 'All fields must be filled' });
    next();
  };

  public password = async (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: 'All fields must be filled' });
    next();
  };
}
