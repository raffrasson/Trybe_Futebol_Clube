export interface entityTeam {
  id: number;
  teamName: string;
}

export interface ITeamModel {
  list(): Promise<entityTeam[]>;

  getOne(id: number): Promise<entityTeam>;
}

export interface ITeamService {
  list(): Promise<entityTeam[]>;
  
  getOne(id: number): Promise<entityTeam>;
}

export interface entityMatch {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatchModel {
  list(): Promise<entityMatch[]>;
  listFromTeam(id: number): Promise<entityMatch[]>;
  getOne(id: number): Promise<entityMatch>
  create(data: object): Promise<entityMatch>;
  changeProgress(id: number): Promise<void>;
  changeMatch(homeTeamGoals: number, awayTeamGoals: number, id: number): Promise<void>;
}

export interface IMatchService {
  list(): Promise<entityMatch[]>;
  listFromTeam(id: number): Promise<entityMatch[]>;
  getOne(id: number): Promise<entityMatch>;
  create(data: object): Promise<entityMatch>;
  changeProgress(id: number): Promise<void>;
  changeMatch(homeTeamGoals: number, awayTeamGoals: number, id: number): Promise<void>;
}

export interface entityLBTeam {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}

export interface ILeaderboardModel {
  list(): Promise<entityMatch[]>;

}

export interface ILeaderboardService {
  listFromTeam(): any;
  listFromTeamHome(): any;

}
