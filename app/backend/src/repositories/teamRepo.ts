import Team from '../database/models/team';
import { ITeamModel, entityTeam } from '../interfaces/interfaces';

export default class teamRepo implements ITeamModel {
  constructor(private model = Team) {
    this.model = model;
  }

  async list(): Promise<entityTeam[]> {
    const teams = await this.model.findAll();

    return teams;
  }
}
