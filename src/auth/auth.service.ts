import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';
import {
  comparePasswords,
  hashPassword,
} from 'src/common/helpers';
import { JwtPayload } from 'src/common/interfaces/auth.interface';
import { OtpService } from 'src/models/otp/otp.service';
import { CreateUserDto } from 'src/models/user/dto/user.dto';
import { User } from 'src/models/user/entities/user.entity';
import { UserService } from 'src/models/user/user.service';
import { ForgotPasswordDto, LoginDto, ResetPasswordDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly user: UserService,
    private readonly jwt: JwtService,
    // private readonly mail: MailService,
    private readonly otp: OtpService,
  ) {}

  async login(inputs: LoginDto): Promise<any> {
    console.log('This is the message');
    const { email, password } = inputs;
    const foundUser = await this.user.getWhere('email', email);

    if (!foundUser) {
      throw new UnauthorizedException('Incorrect email or password.');
    }

    const isMatch = await comparePasswords(password, foundUser.password);
    if (!isMatch) {
      throw new UnauthorizedException('Incorrect email or password.');
    }

    try {
      return await this.generateToken(foundUser);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async register(inputs: CreateUserDto): Promise<any> {
    inputs.password = await hashPassword(inputs.password);

    try {
      const user = await this.user.create(inputs);
      return { user: _.pick(user, ['id', 'email']) };
    } catch (error) {
      if (error?.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async forgotPassword(inputs: ForgotPasswordDto) {
    const currentDate = new Date();
    const expiredDate = new Date(currentDate.getTime() + 60 * 60 * 1000); // 1h

    const user = await this.user.getWhere('email', inputs.email);
    // const foundToken = await this.token.getTokenByUser(user);

    console.log('######## 0');

    // if (foundToken) {
    //   foundToken.created_at = currentDate;
    //   foundToken.expired_at = expiredDate;
    //   // await this.token.updateToken(foundToken);
    //   console.log('######## 2');

    //   // send mail to the user
    //  // await this.mail.sendPasswordResetEmail(user, foundToken.token);
    //   return { success: true };
    // }

    // const resetToken = await generateUniqueToken();
    // console.log('######## 3');

    // const newToken = new Token();
    // newToken.token = resetToken;
    // newToken.created_at = currentDate;
    // newToken.expired_at = expiredDate;
    // newToken.user = user;
    // await this.token.createToken(newToken);
    // console.log('######## 4');

    // send mail to the user
   //  await this.mail.sendPasswordResetEmail(user, resetToken);
    return { success: true };
  }

  async resetPassword(inputs: ResetPasswordDto): Promise<any> {
    const { token, user_id: userId, password } = inputs;
    const user = await this.user.getWhere('id', userId);
    console.log(user);

   // const foundToken = await this.token.getToken(token);
    // console.log(
    //   '🚀 ~ file: auth.service.ts:117 ~ AuthService ~ resetPassword ~ foundToken',
    //   foundToken,
    // );
    // if (!foundToken && user != foundToken.user) {
    //   throw new NotFoundException(`The token is not valid`);
    // }

    // if (isTokenExpired(foundToken)) {
    //   throw new BadRequestException(`The token has expired`);
    // }

    const isPasswordMatch = await comparePasswords(password, user.password);
    if (isPasswordMatch) {
      throw new BadRequestException(
        'You cannot reset your password with the existing password',
      );
    }

    const newPassword = await hashPassword(password);
    await this.user.update(user.id, { password: newPassword });

    return { success: true };
  }

  private async generateToken(
    user: User,
  ): Promise<{ user: User; token: string }> {
    const payload: JwtPayload = { sub: user.id, email: user.email };
    const token = this.jwt.sign(payload);
    return { user: _.omit(user, ['password']), token };
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.user.getWhere('email', payload.email, false);
    if (!user) {
      throw new UnauthorizedException();
    }
    return Promise.resolve(user);
  }
}
