import { NextFunction, Request, Response } from 'express';

export default class loginValidation {
  public validation = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = await req.body;
    if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });
    next();
  };
}
