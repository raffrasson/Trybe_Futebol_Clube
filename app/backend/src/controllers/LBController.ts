import { Request, Response, NextFunction } from 'express';
import { ILeaderboardService } from '../interfaces/interfaces';

class LBController {
  constructor(private service: ILeaderboardService) {
    this.service = service;
  }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await this.service.listFromTeam();
      const lb = teams.sort((a: any, b: any) => {
        if (a.totalPoints > b.totalPoints) return -1; if (a.totalPoints < b.totalPoints) return 1;
        if (a.totalVictories > b.totalVictories) return -1;
        if (a.totalVictories < b.totalVictories) return 1;
        if (a.goalsBalance > b.goalsBalance) return -1;
        if (a.goalsBalance < b.goalsBalance) return 1;
        if (a.goalsFavor > b.goalsFavor) return -1;
        if (a.goalsFavor < b.goalsFavor) return 1;
        if (a.goalsOwn > b.goalsOwn) return 1;
        if (a.goalsOwn < b.goalsOwn) return -1;
        return 0;
      });
      return res.status(200).json(lb);
    } catch (error) {
      next(error);
    }
  };
}

export default LBController;
