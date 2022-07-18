import { compareSync } from 'bcryptjs';
import { JwtPayload, verify } from 'jsonwebtoken';
import User from '../database/models/user';
import 'dotenv/config';

class UserService {
  public model: User;

  public static async login(email: string, password: string) {
    const findUser = await User.findOne({ where: { email } });

    if (!findUser) throw new Error('No user found');

    if (!compareSync(password, findUser.password as string)) throw new Error('No password found');

    return findUser;
  }

  public static authVal = async (tokenData: string) => {
    const secret = await process.env.JWT_SECRET;
    const { data } = await verify(tokenData, secret as string) as JwtPayload;
    const { role } = data;
    const user = await User.findOne({ where: { role } });
    if (!user) {
      throw new Error('Incorrect user');
    }
    console.log(user);
    return user;
  };
}

export default UserService;
