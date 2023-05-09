import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { EnumDeliverySlipStatus } from '../../../common/helpers';

export class CreateDeliverySlipDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Delivery type',
    example: 'C',
  })
  type: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Contract',
    example: '46',
  })
  contract: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Delivery address',
    example: 'Camtronics',
  })
  delivery_address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Carboys delivered',
    example: '11',
  })
  carboys_delivered: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Carboys recovered in state',
    example: '11',
  })
  carboys_recovered_in_state: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Carboys recovered in broken',
    example: '0',
  })
  carboys_recovered_in_broken: string;

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
    description: 'Customer ID',
    required: true,
    example: '0re8g0sfd9fg',
  })
  customer_id: string;
}

export class UpdateDeliverySlipDto extends PartialType(CreateDeliverySlipDto) {
}