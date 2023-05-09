import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { EnumCustomerType } from '../../../common/helpers';
import { CreateAddressDto } from './address.dto';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer name',
    required: true,
    example: 'ENEO Division Technique',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer code',
    required: true,
    example: '292',
  })
  code: string;

  @IsEnum(EnumCustomerType)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer type',
    required: true,
    example: EnumCustomerType.CONTRACT,
  })
  type: EnumCustomerType;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Number of carboy per week',
    required: false,
    example: '20',
  })
  carboys_per_week: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Customer address'})
  address: CreateAddressDto;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
}
