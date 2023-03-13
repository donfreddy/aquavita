import { User } from '../../models/user/entities/user.entity';

export interface ILogin {
  email: string;
  password: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
}

export interface RequestWithUser extends Request {
  user: User;
}