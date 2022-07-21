import { entityTeam, ITeamService, ITeamModel } from '../interfaces/interfaces';

class TeamService implements ITeamService {
  constructor(private model: ITeamModel) {
    this.model = model;
  }

  list(): Promise<entityTeam[]> {
    const teams = this.model.list();

    return teams;
  }
}

export default TeamService;
