import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateDelivererActivityDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Imma vehicle',
    example: '11',
  })
  imma_vehicle: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Delivery date',
    example: '2023-10-03',
    required: false,
  })
  delivery_date: Date;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Exit time',
    example: '2023-10-03',
    required: false,
  })
  exit_time: Date;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Return time',
    example: '2023-10-03',
    required: false,
  })
  return_time: Date;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Turns 1 number of customers delivered',
    example: '11',
    required: false,
  })
  turns1_nb_customers_delivered: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Turns 1 number of unexpected customers',
    example: '1',
    required: false,
  })
  turns1_nb_unexpected_customers: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Turns 1 number of carboys delivered',
    example: '0',
    required: false,
  })
  turns1_nb_carboys_delivered: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Turns 2 number of customers delivered',
    example: '3',
    required: false,
  })
  turns2_nb_customers_delivered: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Turns 2 number of unexpected customers',
    example: '1',
    required: false,
  })
  turns2_nb_unexpected_customers: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Turns 2 number of carboys delivered',
    example: '0',
    required: false,
  })
  turns2_nb_carboys_delivered: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Driver ID',
    required: true,
    example: '0re8g0sfd9fg',
  })
  driver_id: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Array of deliverer ID',
    required: true,
    example: ['0re8g0sfd9fg', '0re8g0sfd9fg'],
  })
  deliverer_ids: string[];
}

export class UpdateDelivererActivityDto extends PartialType(CreateDelivererActivityDto) {
}