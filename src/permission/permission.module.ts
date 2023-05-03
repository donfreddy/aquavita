import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { Module } from '@nestjs/common';
import { UserModule } from '../models/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {
}
