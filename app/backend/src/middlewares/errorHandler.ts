import { NextFunction, Request, Response } from 'express';

const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err.message === 'No user found') {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  if (err.message === 'No password found') {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  if (err.message === 'Unauthorized') {
    console.log('erro aqui');
    return res.status(401).json({ message: 'Invalid or missing token' });
  }
};

export default errorHandler;