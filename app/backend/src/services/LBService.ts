import TeamService from './teamService';
import MatchService from './matchService';
import { ILeaderboardService } from '../interfaces/interfaces';
import goalsFavorCalc from '../middlewares/calcs/goalsFavor';
import gamesCalc from '../middlewares/calcs/gamesCalc';
import totalVictories from '../middlewares/calcs/totalVictories';
import totalDraws from '../middlewares/calcs/totalDraws';
import totalLosses from '../middlewares/calcs/totalLosses';
import goalsOwnCalc from '../middlewares/calcs/goalsOwn';

class LBService implements ILeaderboardService {
  constructor(private teamService: TeamService, private matchService: MatchService) {
    this.teamService = teamService;
    this.matchService = matchService;
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
