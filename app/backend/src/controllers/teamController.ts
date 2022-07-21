import { Request, Response, NextFunction } from 'express';
import { ITeamService } from '../interfaces/interfaces';

class TeamController {
  constructor(private service: ITeamService) {
    this.service = service;
  }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await this.service.list();
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  };
}

export default TeamController;
