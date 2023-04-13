import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserQuarterPlanning } from '../../common/entities/user-quarter-planning.entity';
import { UserService } from '../user/user.service';
import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';
import { Material } from './entities/material.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Material, UserQuarterPlanning])],
  controllers: [MaterialController],
  providers: [MaterialService, UserService],
})
export class MaterialModule {
}
