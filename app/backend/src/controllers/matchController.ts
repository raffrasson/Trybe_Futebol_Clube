import { Request, Response, NextFunction } from 'express';
import { IMatchService } from '../interfaces/interfaces';

class MatchController {
  constructor(private service: IMatchService) {
    this.service = service;
  }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const matches = await this.service.list();
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const idNumber = Number(id);
      const Match = await this.service.getOne(idNumber);
      return res.status(200).json(Match);
    } catch (error) {
      next(error);
    }
  };
}

export default MatchController;
