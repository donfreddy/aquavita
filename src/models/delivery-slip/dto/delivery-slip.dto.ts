import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateDeliverySlipDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The designation of the delivery slip',
    example: 'Bonbonne d\'eau AQUAVITA',
  })
  designation: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Quantity delivered',
    example: '11',
  })
  qty_delivered: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Quantity recovered in state',
    example: '11',
  })
  qty_recovered_in_state: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Quantity recovered in broken',
    example: '0',
  })
  qty_recovered_in_broken: string;

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
  @ApiProperty({
    description: 'Customer ID',
    required: true,
    example: '0re8g0sfd9fg',
  })
  customer_id: string;

  // @IsString()
  // @IsNotEmpty()
  // @ApiProperty({
  //   description: 'Purchase order ID',
  //   required: true,
  //   example: '0re8g0sfd9fg',
  // })
  // purchase_order_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Deliverer ID',
    required: true,
    example: '0re8g0sfd9fg',
  })
  deliverer_id: string;
}

export class UpdateDeliverySlipDto extends PartialType(CreateDeliverySlipDto) {
}