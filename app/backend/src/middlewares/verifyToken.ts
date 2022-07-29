import { JwtPayload, verify } from 'jsonwebtoken';
import 'dotenv/config';

const tokenValid = async (tokenData: string) => {
  const secret = await process.env.JWT_SECRET;
  try {
    const payload = await verify(tokenData, secret as string) as JwtPayload;
    return payload;
  } catch (error) {
    console.log(error);
  }
};

export default tokenValid;
