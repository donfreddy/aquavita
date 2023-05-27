import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class DeliveryRoundDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Number of customers delivered',
    example: '11',
    required: false,
  })
  nb_customers_delivered: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Number of unexpected customers',
    example: '1',
    required: false,
  })
  nb_unexpected_customers: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Number of carboys delivered',
    example: '0',
    required: false,
  })
  nb_carboys_delivered: string;
}

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
  delivery_date: string;

  // @IsString()
  // @IsNotEmpty()
  // @IsOptional()
  // @ApiProperty({
  //   description: 'Exit time',
  //   example: 0,
  //   required: false,
  // })
  // installation: number;
  //
  // @IsString()
  // @IsNotEmpty()
  // @IsOptional()
  // @ApiProperty({
  //   description: 'Exit time',
  //   example: '8h00',
  //   required: false,
  // })
  // exit_time: string;
  //
  // @IsString()
  // @IsNotEmpty()
  // @IsOptional()
  // @ApiProperty({
  //   description: 'Return time',
  //   example: '17h00',
  //   required: false,
  // })
  // return_time: string;

  // @IsArray()
  // @IsNotEmpty()
  // @ApiProperty({
  //   type: DeliveryRoundDto,
  //   isArray: true,
  // })
  // delivery_rounds: DeliveryRoundDto[];

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

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Array of delivery site ID',
    required: true,
    example: ['0re8g0sfd9fg', '0re8g0sfd9fg'],
  })
  delivery_site_ids: string[];
}

export class UpdateDelivererActivityDto extends PartialType(CreateDelivererActivityDto) {
}