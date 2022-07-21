import { NextFunction, Request, Response } from 'express';

const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err.message === 'No user found') {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  if (err.message === 'No password found') {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  if (err.message === 'Unauthorized') {
    return res.status(401).json({ message: 'Invalid or missing token' });
  }
  if (err.message === 'Incorrect token') {
    return res.status(401).json({ message: 'Invalid or missing token' });
  }
};

export default errorHandler;
