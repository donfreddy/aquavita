import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { AddressDto } from '../../customer/dto/customer.dto';

export class CreateDeliverySiteDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Delivery site name',
    example: 'MTN Makepe',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The responsible of the delivery site',
    example: 'John Doe',
  })
  responsible: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Delivery site email',
    example: 'example@domain.com',
    required: false,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Delivery site phone',
    example: '220123702',
    required: true,
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer ID',
    required: true,
    example: '0re8g0sfd9fg',
  })
  customer_id: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Delivery site address' })
  address: AddressDto;
}

export class UpdateDeliverySiteDto extends PartialType(CreateDeliverySiteDto) {
}