import { PresenceController } from './presence.controller';
import { PresenceService } from './presence.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Presence } from './entities/presence.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserQuarterPlanning } from '../../common/entities/user-quarter-planning.entity';
import { Role } from '../role/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Presence, User, UserQuarterPlanning,Role])],
  controllers: [PresenceController],
  providers: [PresenceService, UserService],
})
export class PresenceModule {
}
