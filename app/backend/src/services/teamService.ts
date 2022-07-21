import { entityTeam, ITeamService, ITeamModel } from '../interfaces/interfaces';

class TeamService implements ITeamService {
  constructor(private model: ITeamModel) {
    this.model = model;
  }

  async list(): Promise<entityTeam[]> {
    const teams = await this.model.list();

    return teams;
  }
}

export default TeamService;
