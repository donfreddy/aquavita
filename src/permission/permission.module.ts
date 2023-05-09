import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { Module } from '@nestjs/common';
import { UserModule } from '../models/user/user.module';
import { Permissions, PERMISSIONS } from './factories/permissions';
import { PermissionFactory } from './factories/permission.factory';

@Module({
  imports: [UserModule],
  controllers: [PermissionController],
  providers: [PermissionService, Permissions, PermissionFactory],
  exports: [PermissionService, PERMISSIONS],
})
export class PermissionModule {}
