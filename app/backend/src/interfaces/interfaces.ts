// import Team from '../database/models/team';

export interface entityTeam {
  id: number;
  teamName: string;
}

// export interface iTeam {
//   list(): Promise<Team[]>;
// }

export interface ITeamModel {
  list(): Promise<entityTeam[]>;
  getOne(id: number): Promise<entityTeam>;
}

export interface ITeamService {
  list(): Promise<entityTeam[]>;
  getOne(id: number): Promise<entityTeam>;
}
