import { Otp } from '../models/otp/entities/otp.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { UserService } from 'src/models/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user/entities/user.entity';
import { OtpService } from 'src/models/otp/otp.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { configService } from '../config/config.service';
import { JwtModule } from '@nestjs/jwt';
import { QuarterTimeService } from '../models/quater-time/quarter-time.service';
import { QuarterTime } from '../models/quater-time/entities/quarter-time.entity';
import { UserQuarterPlanning } from '../common/entities/user-quarter-planning.entity';
import { QuarterPlanning } from '../common/entities/quarter-planning.entity';
import { Role } from '../models/role/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Otp,QuarterTime,UserQuarterPlanning,User,QuarterPlanning,Role]),
    PassportModule,
    JwtModule.register({
      secret: configService.getJWT().secretKey,
      signOptions: {
        expiresIn: configService.getJWT().expiresIn,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, MailService, OtpService, UserService, QuarterTimeService],
  exports: [AuthService, JwtStrategy, MailService, OtpService, UserService],
})
export class AuthModule {
}
