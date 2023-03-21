import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserQuarterTime } from '../../common/entities/user-quarter-time.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserQuarterTime])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
}