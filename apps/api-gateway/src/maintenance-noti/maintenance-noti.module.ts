import { Module } from '@nestjs/common';
import { MaintenanceNotiController } from './maintenance-noti.controller';

@Module({
  controllers: [MaintenanceNotiController],
})
export class MaintenanceNotiModule {}
