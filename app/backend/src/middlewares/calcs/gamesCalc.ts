import { Op } from 'sequelize';
import { entityMatch } from '../../interfaces/interfaces';
import Match from '../../database/models/match';

const gamesCalc = async (id: number) => {
  const matches: entityMatch[] = await Match.findAll({ where: {
    [Op.or]: [ // fonte: documentação do sequelize: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
      { homeTeam: id },
      { awayTeam: id },
    ],
    [Op.and]: { inProgress: false },
  },
  });
  return (matches.length);
};

const gamesCalcHome = async (id: number) => {
  const matches: entityMatch[] = await Match.findAll({ where: {
    [Op.or]: [ // fonte: documentação do sequelize: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
      { homeTeam: id },
    ],
    [Op.and]: { inProgress: false },
  },
  });
  return (matches.length);
};

export {gamesCalc, gamesCalcHome};
