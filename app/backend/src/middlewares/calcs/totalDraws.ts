import { Op } from 'sequelize';
import { entityMatch } from '../../interfaces/interfaces';
import Match from '../../database/models/match';

const totalDraws = async (id: number) => {
  const matches: entityMatch[] = await Match.findAll({ where: {
    [Op.or]: [ // fonte: documentação do sequelize: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
      { homeTeam: id },
      { awayTeam: id },
    ],
    [Op.and]: { inProgress: false },
  },
  });
  let draws = 0;
  await matches.forEach(async (match) => {
    if (match.homeTeamGoals === match.awayTeamGoals) {
      draws += 1;
    }
  });
  return draws;
};

const totalDrawsHome = async (id: number) => {
  const matches: entityMatch[] = await Match.findAll({ where: {
    [Op.or]: [ // fonte: documentação do sequelize: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
      { homeTeam: id },
    ],
    [Op.and]: { inProgress: false },
  },
  });
  let draws = 0;
  await matches.forEach(async (match) => {
    if (match.homeTeamGoals === match.awayTeamGoals) {
      draws += 1;
    }
  });
  return draws;
};

export  {totalDraws, totalDrawsHome};
