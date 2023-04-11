import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateFountain {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Client name',
    required: true,
    example: 'Orange Cameroon',
  })
  client_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Deliverer id',
    required: true,
    example: '0re8g0sfd9fg',
  })
  deliverer_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Serial number',
    required: true,
    example: 'BON77878',
  })
  serial_number: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Vehicle',
    required: true,
    example: '12500000',
  })
  vehicule: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Reason',
    required: false,
    example: 'Some reason',
  })
  reason: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Delivery date',
    required: true,
    example: '2023-10-03',
  })
  delivery_date: string;
}

export class UpdateFountain extends PartialType(CreateFountain) {}
