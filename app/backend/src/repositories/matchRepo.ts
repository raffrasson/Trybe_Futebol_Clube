import Team from '../database/models/team';
import Match from '../database/models/match';
import { IMatchModel, entityMatch } from '../interfaces/interfaces';

export default class teamRepo implements IMatchModel {
  constructor(private model = Match) {
    this.model = model;
  }

  async list(): Promise<entityMatch[]> {
    const matches = await this.model.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName' as string] },
        { model: Team, as: 'teamAway', attributes: ['teamName' as string] },
      ],
    });
    return matches;
  }

  async getOne(id: number): Promise<entityMatch> {
    const match = await this.model.findOne({ where: { id } });
    if (!match) throw new Error('no match found');
    return match;
  }
}
