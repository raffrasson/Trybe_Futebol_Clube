import { NextFunction, Request, Response } from 'express';

const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err.message === 'No user found') {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  if (err.message === 'errou') {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  if (err.message === 'Incorrect token') {
    return res.status(401).json({ message: 'There is no team with such id!' });
  }

  if (err.message === 'It is not possible to create a match with two equal teams') {
    return res.status(401)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  if (err.message === 'no team found') {
    return res.status(404)
      .json({ message: 'There is no team with such id!' });
  }
};

export default errorHandler;
