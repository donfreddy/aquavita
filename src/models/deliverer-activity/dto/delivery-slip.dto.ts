import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { EnumDeliverySlipStatus } from '../../../common/helpers';

export class CreateDeliverySlipDto {

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Contract',
    required: false,
    example: 46,
  })
  contract: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Contract',
    required: false,
    example: null,
  })
  stock: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Carboys delivered',
    example: 11,
  })
  carboys_delivered: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Tell if delivery slip is unanticipated',
    required: false,
    default: false,
    example: false,
  })
  is_unanticipated: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Carboys recovered in state',
    required: false,
    example: 11,
  })
  carboys_recovered_in_state: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Carboys recovered in broken',
    required: false,
    example: 0,
  })
  carboys_recovered_in_broken: number;

  @IsEnum(EnumDeliverySlipStatus)
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Delivery slip status',
    required: false,
    example: EnumDeliverySlipStatus.PENDING,
  })
  status: EnumDeliverySlipStatus;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Observation',
    required: false,
    example: 'The customer was not there',
  })
  observation: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Delivery Site ID',
    required: true,
    example: '0re8g0sfd9fg',
  })
  delivery_site_id: string;
}

export class UpdateDeliverySlipDto extends PartialType(CreateDeliverySlipDto) {
}