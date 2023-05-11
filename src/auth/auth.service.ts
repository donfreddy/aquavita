import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';
import {
  comparePasswords,
  EnumOtpRaison,
  generateOtpCode,
  hashPassword,
} from 'src/common/helpers';
import { User } from 'src/models/user/entities/user.entity';
import { UserService } from 'src/models/user/user.service';
import { CheckOtpDto, ForgotPasswordDto, LoginDto, ResetPasswordDto } from './dto/auth.dto';
import { OtpService } from 'src/models/otp/otp.service';
import { CreateUserDto } from '../models/user/dto/user.dto';
import { JwtPayload } from '../common/interfaces';
import { MailPayload } from '../common/dtos/mail-payload';
import { MailService } from '../mail/mail.service';
import { Otp } from '../models/otp/entities/otp.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly user: UserService,
    private readonly jwt: JwtService,
    private readonly mail: MailService,
    private readonly otp: OtpService,
  ) {
  }

  async login(inputs: LoginDto): Promise<any> {
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
      throw new InternalServerErrorException();
    }
  }

  async register(inputs: CreateUserDto): Promise<any> {
    try {
      const user = await this.user.create(inputs);
      return { user: _.pick(user, ['id', 'email']) };
    } catch (error) {
      if (error?.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException('Something wen wrong');
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
      await this.sendPasswordResetEmail(user, foundOtp.code);
      return { success: true };
    }

    // Create new otp code if no
    const newCode = await this.getOtp();
    await this.otp.create(user, newCode, EnumOtpRaison.RESET_PASSWORD);

    // send mail to the user
    await this.sendPasswordResetEmail(user, newCode);
    return { success: true };
  }

  async resetPassword(inputs: ResetPasswordDto): Promise<any> {
    const { otp_code: code, user_id: userId, password } = inputs;
    const user = await this.user.getWhere('id', userId);

    const foundOtp = await this.otp.getWhere('code', code);
    if (!foundOtp && user != foundOtp.user) {
      throw new BadRequestException(`The token is not valid`);
    }

    if (await this.otp.isExpired(foundOtp)) {
      throw new BadRequestException(`The otp code has expired`);
    }

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

  async checkOpt(inputs: CheckOtpDto) {
    await this.verifyOtp(inputs.otp_code);
    return { success: true };
  }

  private async verifyOtp(code: string, reason?: EnumOtpRaison): Promise<Otp> {
    const otp = await this.otp.getWhere('code', code, reason);
    if (!otp) {
      throw new BadRequestException('Invalid OTP code.');
    }

    if (await this.otp.isExpired(otp)) {
      await this.otp.delete(otp);
      throw new BadRequestException('OTP code is expired.');
    }

    if (otp.is_used) {
      throw new BadRequestException('OTP code is already used.');
    }

    if (reason && otp.reason !== reason) {
      throw new BadRequestException('OTP code is invalid.');
    }

    return otp;
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

  private async getOtp(): Promise<string> {
    let newCode = generateOtpCode();
    // make sur it's unique on database
    while ((await this.otp.getWhere('code', newCode)) != undefined) {
      newCode = generateOtpCode();
    }
    return newCode;
  }

  private async sendPasswordResetEmail(user: User, otpCode: string) {
    const payload = new MailPayload();
    payload.to = user.email;
    payload.subject = 'Password reset';
    payload.template = 'password-reset';
    payload.props = {
      username: user.first_name,
      otpCode: otpCode,
    };

    await this.mail.sendEmail(payload);
  }
}
