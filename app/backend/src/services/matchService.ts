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
}

export default MatchService;
