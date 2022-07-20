import { JwtPayload, verify } from 'jsonwebtoken';
import 'dotenv/config';
import User from '../database/models/user';

const tokenVal = async (tokenData: string) => {
  const secret = await process.env.JWT_SECRET;
  const payload = await verify(tokenData, secret as string) as JwtPayload;
  if (!payload) {
    throw new Error('Incorrect token');
  }
  const { role } = payload.data;
  const user = await User.findOne({ where: { role } });
  if (!user) {
    throw new Error('Incorrect user');
  }
  return user;
};

export default tokenVal;
