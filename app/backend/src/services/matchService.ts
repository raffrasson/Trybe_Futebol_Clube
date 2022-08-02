import { entityMatch, IMatchService, IMatchModel } from '../interfaces/interfaces';

class MatchService implements IMatchService {
  constructor(private model: IMatchModel) {
    this.model = model;
  }

  async list(): Promise<entityMatch[]> {
    const matches = await this.model.list();
    console.log(matches);
    return matches;
  }

  async getOne(id: number): Promise<entityMatch> {
    const match = await this.model.getOne(id);

    return match;
  }

  async create(data: object): Promise<entityMatch> {
    const match = await this.model.create(data);

    return match;
  }

  async changeProgress(id: number): Promise<void> {
    await this.model.changeProgress(id);
  }

  async changeMatch(homeTeamGoals: number, awayTeamGoals: number, id: number): Promise<void> {
    await this.model.changeMatch(homeTeamGoals, awayTeamGoals, id);
  }
}

export default MatchService;
