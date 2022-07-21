import { compareSync } from 'bcryptjs';
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
}

export default UserService;
