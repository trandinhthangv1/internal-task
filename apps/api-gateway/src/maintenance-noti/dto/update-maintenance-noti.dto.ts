import { PartialType } from '@nestjs/mapped-types';
import { CreateMaintenanceNotiDto } from './create-maintenance-noti.dto';

export class UpdateMaintenanceNotiDto extends PartialType(CreateMaintenanceNotiDto) {}
