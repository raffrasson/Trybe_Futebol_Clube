import { Op } from 'sequelize';
import { entityMatch } from '../../interfaces/interfaces';
import Match from '../../database/models/match';

const goalsFavorCalc = async (id: number) => {
  const matches: entityMatch[] = await Match.findAll({ where: {
    [Op.or]: [ // fonte: documentação do sequelize: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
      { homeTeam: id },
      { awayTeam: id },
    ],
    [Op.and]: { inProgress: false },
  },
  });
  let goals = 0;
  await matches.forEach(async (match) => {
    if (match.homeTeam === id) {
      goals += match.homeTeamGoals;
    }
    if (match.awayTeam === id) {
      goals += match.awayTeamGoals;
    }
  });
  return goals;
};

const goalsFavorCalcHome = async (id: number) => {
  const matches: entityMatch[] = await Match.findAll({ where: {
    [Op.or]: [ // fonte: documentação do sequelize: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
      { homeTeam: id },
    ],
    [Op.and]: { inProgress: false },
  },
  });
  let goals = 0;
  await matches.forEach(async (match) => {
    if (match.homeTeam === id) {
      goals += match.homeTeamGoals;
    }
    if (match.awayTeam === id) {
      goals += match.awayTeamGoals;
    }
  });
  return goals;
};

export {goalsFavorCalc, goalsFavorCalcHome};
