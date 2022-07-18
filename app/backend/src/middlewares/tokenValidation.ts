import { JwtPayload, verify } from 'jsonwebtoken';
import 'dotenv/config';
import User from '../database/models/user';

const authVal = async (tokenData: string) => {
  const secret = await process.env.JWT_SECRET;
  const payload = await verify(tokenData, secret as string) as JwtPayload;
  if (!payload) {
    throw new Error('Incorrect token');
  }
  console.log(payload.data);
  const { role } = payload.data;
  const user = await User.findOne({ where: { role } });
  if (!user) {
    throw new Error('Incorrect user');
  }
  return user;
};

export default authVal;
