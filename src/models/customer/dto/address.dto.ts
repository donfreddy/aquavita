import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateAddressDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer street address',
    required: false,
    example: 'Rue 1',
  })
  street: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer city',
    required: false,
    default: 'Douala',
    example: 'Douala',
  })
  city: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer region',
    required: false,
    default: 'Littoral',
    example: 'Littoral',
  })
  region: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Phone number 1',
    required: false,
    example: '699999999',
  })
  phone_number_1: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Phone number 2',
    required: false,
    example: '675859540',
  })
  phone_number_2: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer zone',
    required: false,
    example: 'Ndokotti',
  })
  zone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Postcode',
    required: false,
    example: '00237',
  })
  postcode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Taxpayer number',
    required: true,
    example: 'P123456789',
  })
  taxpayer_number: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Company registration number',
    required: true,
    example: 'RC123456789',
  })
  rc_number: string;
}

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
}