import { Request, Response, NextFunction } from 'express';
import { ILeaderboardService } from '../interfaces/interfaces';
import sorter from '../middlewares/sorter';

class LBController {
  constructor(private service: ILeaderboardService) {
    this.service = service;
  }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await this.service.listFromTeam();
      const lb = sorter(teams);

      return res.status(200).json(lb);
    } catch (error) {
      next(error);
    }
  };
}

export default LBController;
