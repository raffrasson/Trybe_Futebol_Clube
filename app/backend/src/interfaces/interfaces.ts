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
  getOne(id: number): Promise<entityMatch>
  create(data: object): Promise<entityMatch>;
  changeProgress(id: number): Promise<void>;
}

export interface IMatchService {
  list(): Promise<entityMatch[]>;
  getOne(id: number): Promise<entityMatch>;
  create(data: object): Promise<entityMatch>;
  changeProgress(id: number): Promise<void>;
}
