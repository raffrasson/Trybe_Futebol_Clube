import { Op } from 'sequelize';
import { entityMatch } from '../../interfaces/interfaces';
import Match from '../../database/models/match';

const totalVictories = async (id: number) => {
  const matches: entityMatch[] = await Match.findAll({ where: {
    [Op.or]: [ // fonte: documentação do sequelize: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
      { homeTeam: id },
      { awayTeam: id },
    ],
    [Op.and]: { inProgress: false },
  },
  });
  let victories = 0;
  await matches.forEach(async (match) => {
    if (match.homeTeam === id && match.homeTeamGoals > match.awayTeamGoals) {
      victories += 1;
    }
    if (match.awayTeam === id && match.awayTeamGoals > match.homeTeamGoals) {
      victories += 1;
    }
  });
  return victories;
};

export default totalVictories;
