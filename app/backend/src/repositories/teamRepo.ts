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

  async getOne(id: number): Promise<entityTeam> {
    const team = await this.model.findOne({ where: { id } });
    if (!team) throw new Error('no team found');
    return team;
  }
}
