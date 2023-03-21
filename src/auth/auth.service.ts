import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';
import {
  AuthFailureResponse,
  BadRequestError,
  comparePasswords,
  ConflictResponse,
  EnumOtpRaison,
  generateOtpCode,
  hashPassword,
  InternalErrorResponse,
  SuccessResponse,
} from 'src/common/helpers';
import { JwtPayload } from 'src/common/interfaces/auth.interface';
// import { OtpService } from 'src/mo  ffdels/otp/otp.service';
import { CreateUserDto } from 'src/models/user/dto/user.dto';
import { User } from 'src/models/user/entities/user.entity';
import { UserService } from 'src/models/user/user.service';
import { ForgotPasswordDto, LoginDto, ResetPasswordDto } from './dto/auth.dto';
import { Response } from 'express';
import { OtpService } from 'src/models/otp/otp.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly user: UserService,
    private readonly jwt: JwtService,
    // private readonly mail: MailService,
    private readonly otp: OtpService,
  ) {
  }

  async login(inputs: LoginDto): Promise<any> {
    console.log('This is the message');
    const { email, password } = inputs;
    const foundUser = await this.user.getWhere('email', email);

    if (!foundUser) {
      return new AuthFailureResponse('Incorrect email or password.');
    }

    const isMatch = await comparePasswords(password, foundUser.password);
    if (!isMatch) {
      return new AuthFailureResponse('Incorrect email or password.');
    }

    try {
      return new SuccessResponse('Success', this.generateToken(foundUser));
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async register(res: Response, inputs: CreateUserDto): Promise<any> {
    //check if the user is an employee
    const foundUser = await this.user.getWhere('email', inputs.email, [],false);
    if (foundUser) {
      return new BadRequestError('User already exists with this email.');
    }

    try {
      const user = await this.user.create(inputs);
      return { user: _.pick(user, ['id', 'email']) };
      //  return new SuccessResponse('User registered successfully.', user).send(res);
    } catch (error) {
      if (error?.code === 'ER_DUP_ENTRY') {
        return new ConflictResponse('Email already exists').send(res);
      } else {
        return new InternalErrorResponse().send(res);
      }
    }
  }

  async forgotPassword(inputs: ForgotPasswordDto) {
    const currentDate = new Date();
    const expiredDate = new Date(currentDate.getTime() + 60 * 60 * 1000); // 1h

    const user = await this.user.getWhere('email', inputs.email);
    const foundOtp = await this.otp.getWhere('user', user);

    if (foundOtp && !foundOtp.is_used) {
      foundOtp.created_at = currentDate;
      foundOtp.expired_at = expiredDate;
      await this.otp.update(foundOtp);

      // send mail to the user
      // await this.mail.sendPasswordResetEmail(user, foundToken.token);
      return { success: true };
    }

    let newCode = generateOtpCode();
    // make sur it's unique on database
    while ((await this.otp.getWhere('code', newCode)) != undefined) {
      newCode = generateOtpCode();
    }

    // Create new otp code
    await this.otp.create(user, EnumOtpRaison.RESET_PASSWORD);

    // send mail to the user
    //  await this.mail.sendPasswordResetEmail(user, resetToken);
    return { success: true };
  }

  async resetPassword(inputs: ResetPasswordDto): Promise<any> {
    const { otp_code: code, user_id: userId, password } = inputs;
    const user = await this.user.getWhere('id', userId);

    const foundOtp = await this.otp.getWhere('code', code);
    if (!foundOtp && user != foundOtp.user) {
      throw new BadRequestError(`The token is not valid`);
    }

    if (await this.otp.isExpired(foundOtp)) {
      throw new BadRequestError(`The otp code has expired`);
    }

    const isPasswordMatch = await comparePasswords(password, user.password);
    if (isPasswordMatch) {
      throw new BadRequestError(
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

    return { user, token };
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.user.getWhere('email', payload.email, [], false);
    if (!user) {
      throw new UnauthorizedException();
    }
    return Promise.resolve(user);
  }
}
