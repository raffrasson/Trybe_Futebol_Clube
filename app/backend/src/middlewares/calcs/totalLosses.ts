import { Op } from 'sequelize';
import { entityMatch } from '../../interfaces/interfaces';
import Match from '../../database/models/match';

const totalLosses = async (id: number) => {
  const matches: entityMatch[] = await Match.findAll({ where: {
    [Op.or]: [ // fonte: documentação do sequelize: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
      { homeTeam: id },
      { awayTeam: id },
    ],
    [Op.and]: { inProgress: false },
  },
  });
  let losses = 0;
  await matches.forEach(async (match) => {
    if (match.homeTeam === id && match.homeTeamGoals < match.awayTeamGoals) {
      losses += 1;
    }
    if (match.awayTeam === id && match.awayTeamGoals < match.homeTeamGoals) {
      losses += 1;
    }
  });
  return losses;
};

export default totalLosses;
