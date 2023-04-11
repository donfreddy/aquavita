import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreatePurchaseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Initiator id',
    required: true,
    example: '0re8g0sfd9fg',
  })
  initiator_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Item',
    required: true,
    example: 'BON77878',
  })
  item: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Quantity',
    required: true,
    example: '125',
  })
  quantity: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Unit price',
    required: true,
    example: '12500000',
  })
  unit_price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Initial price',
    required: true,
    example: '12500',
  })
  initial_price: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Observation',
    required: false,
    example: 'Some observation',
  })
  observation: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Purchase date',
    required: true,
    example: '2023-10-03',
  })
  date: Date;
}

export class UpdatePurchaseDto extends PartialType(CreatePurchaseDto) {}