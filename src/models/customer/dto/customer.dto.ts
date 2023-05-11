import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { EnumCustomerType } from '../../../common/helpers';
import { CreateCompanyDto } from './company.dto';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer name',
    required: true,
    example: 'ENEO Division Technique',
  })
  name: string;

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
    description: 'Customer complement',
    required: false,
    example: null,
  })
  complement: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer street address',
    required: true,
    example: 'Rond-point deido',
  })
  address: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer city',
    required: false,
    default: 'Douala',
    example: 'Douala',
  })
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer zone',
    required: true,
    example: 'Deido',
  })
  zone: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer postcode',
    required: false,
    example: '00237',
  })
  postcode: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer phone number',
    required: false,
    example: '699999999',
  })
  phone: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer fax',
    required: false,
    example: '699999999',
  })
  fax: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer email',
    required: false,
    example: 'johndoe@gmail.com',
  })
  email: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer website',
    required: false,
    example: 'www.google.com',
  })
  website: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Number of fountains',
    required: false,
    default: 0,
    example: 6,
  })
  fountains_count: number;

  @IsNotEmpty()
  @ApiProperty({ description: 'Customer company' })
  company: CreateCompanyDto;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer accounting general account',
    required: false,
    example: '411000',
  })
  accounting_general_account: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer accounting third party account',
    required: false,
    example: '300000',
  })
  accounting_third_party_account: string;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer has TVA',
    required: false,
    default: true,
    example: true,
  })
  has_tva: boolean;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer is blocked',
    required: false,
    default: false,
    example: false,
  })
  is_blocked: boolean;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The reason for blocking the customer',
    required: false,
    example: 'Customer has not paid his bills',
  })
  blocking_reason: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Blocking date',
    required: false,
    example: '2022-08-01',
  })
  blocking_date: Date;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Blocking employee',
    required: false,
    example: 'John Doe',
  })
  blocking_employee: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Last update of the blocking',
    required: false,
    example: '2022-08-01',
  })
  blocking_last_update: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
}
