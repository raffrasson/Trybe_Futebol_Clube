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

  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const idNumber = Number(id);
      const team = await this.service.getOne(idNumber);
      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  };
}

export default TeamController;
