import TeamService from './teamService';
import MatchService from './matchService';
import { ILeaderboardService } from '../interfaces/interfaces';
import {goalsFavorCalc, goalsFavorCalcHome} from '../middlewares/calcs/goalsFavor';
import {gamesCalc, gamesCalcHome} from '../middlewares/calcs/gamesCalc';
import {totalVictories, totalVictoriesHome} from '../middlewares/calcs/totalVictories';
import {totalDraws, totalDrawsHome} from '../middlewares/calcs/totalDraws';
import {totalLosses, totalLossesHome} from '../middlewares/calcs/totalLosses';
import {goalsOwnCalc, goalsOwnCalcHome} from '../middlewares/calcs/goalsOwn';

class LBService implements ILeaderboardService {
  constructor(private teamService: TeamService, private matchService: MatchService) {
    this.teamService = teamService;
    this.matchService = matchService;
  }

  async listFromTeam(): Promise<any> {
    const teams = await this.teamService.list();
    const boardArray = teams.map(async (team) => ({
      name: team.teamName,
      totalPoints: (await totalVictories(team.id)) * 3 + (await totalDraws(team.id)),
      totalGames: await gamesCalc(team.id),
      totalVictories: await totalVictories(team.id),
      totalDraws: await totalDraws(team.id),
      totalLosses: await totalLosses(team.id),
      goalsFavor: await goalsFavorCalc(team.id),
      goalsOwn: await goalsOwnCalc(team.id),
      goalsBalance: (await goalsFavorCalc(team.id)) - (await goalsOwnCalc(team.id)),
      efficiency: Math.round(((((await totalVictories(team.id)) * 3
          + (await totalDraws(team.id)))
           / ((await gamesCalc(team.id)) * 3)) * 100) * 100) / 100,
    }));
    return Promise.all(boardArray);
  }

  async listFromTeamHome(): Promise<any> {
    const teams = await this.teamService.list();
    const matches = await this.matchService.list()
    const boardArray = teams.map(async (team) => ({
      name: team.teamName,
      totalPoints: (await totalVictoriesHome(team.id)) * 3 + (await totalDrawsHome(team.id)),
      totalGames: await gamesCalcHome(team.id),
      totalVictories: await totalVictoriesHome(team.id),
      totalDraws: await totalDrawsHome(team.id),
      totalLosses: await totalLossesHome(team.id),
      goalsFavor: await goalsFavorCalcHome(team.id),
      goalsOwn: await goalsOwnCalcHome(team.id),
      goalsBalance: (await goalsFavorCalcHome(team.id)) - (await goalsOwnCalcHome(team.id)),
      efficiency: Math.round(((((await totalVictoriesHome(team.id)) * 3
          + (await totalDrawsHome(team.id)))
           / ((await gamesCalcHome(team.id)) * 3)) * 100) * 100) / 100,
    }));
    return Promise.all(boardArray);
  }
}

export default LBService;

// "name": "Palmeiras",
// "totalPoints": 13,
// "totalGames": 5,
// "totalVictories": 4,
// "totalDraws": 1,
// "totalLosses": 0,
// "goalsFavor": 17,
// "goalsOwn": 5,
// "goalsBalance": 12,
// "efficiency": 86.67

// async listFromTeam(): Promise<any> {
//   const teams = await this.teamService.list();
//   const array: object[] = [];
//   const board = await teams.forEach(async (team) => {
//     const teamMatches = await this.matchService.listFromTeam(team.id);

//     // const totalGoals = goalsArray.reduce((pv, cv) => pv + cv, 0);
//     teamMatches.map((match) => {
//       const final = {
//         name: team.teamName,
//         matches: teamMatches.length,
//         goalsFavor: this.goalsFavorCalc(match, team),
//       };
//       return final;
//     }); console.log(array);
//     return array;
//   });
//   return board;
// }
// }
