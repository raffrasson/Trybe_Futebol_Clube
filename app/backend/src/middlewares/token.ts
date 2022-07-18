import { sign, SignOptions } from 'jsonwebtoken';
import 'dotenv/config';

const senha = process.env.JWT_SECRET;

const jwtConfig: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const token = (data = {}) => sign({ data }, senha as string, jwtConfig);

export default token;
