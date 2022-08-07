import { Op } from 'sequelize';
import Team from '../database/models/team';
import Match from '../database/models/match';
import { IMatchModel, entityMatch } from '../interfaces/interfaces';

export default class matchRepo implements IMatchModel {
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

  async listFromTeam(id:number): Promise<entityMatch[]> {
    const matches = await this.model.findAll(
      { where: {
        [Op.or]: [ // fonte: documentação do sequelize: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
          { homeTeam: id },
          { awayTeam: id },
        ],
      },
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName' as string] },
        { model: Team, as: 'teamAway', attributes: ['teamName' as string] },
      ],
      },
    );
    return matches;
  }

  async create(data: object): Promise<entityMatch> {
    const match = await this.model.create(data);
    return match;
  }

  async changeProgress(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async changeMatch(homeTeamGoals: number, awayTeamGoals: number, id: number): Promise<void> {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  async getOne(id: number): Promise<entityMatch> {
    const match = await this.model.findOne({ where: { id } });
    if (!match) throw new Error('no match found');
    return match;
  }
}
