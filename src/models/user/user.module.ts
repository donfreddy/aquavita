import { ProfileController } from './profile.controller';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserQuarterPlanning } from '../../common/entities/user-quarter-planning.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserQuarterPlanning])],
  controllers: [UserController, ProfileController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {
}
