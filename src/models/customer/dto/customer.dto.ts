import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { EnumCustomerType } from '../../../common/helpers';

export class BlockingDto {
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

  @IsString()
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
    description: 'Unblocking date',
    required: false,
    example: '2022-12-01',
  })
  unblocking_date: Date;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Blocking employee',
    required: false,
    example: 'John Doe',
  })
  blocking_employee: string;
}

class ContactDto {
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
}

export class AddressDto {
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
}

class WorkScheduleDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Opening time',
    required: false,
    example: '08:00',
  })
  opening_time: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Pause time start',
    required: false,
    example: '12:00',
  })
  pause_time_start: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Pause time end',
    required: false,
    example: '14:00',
  })
  pause_time_end: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Closing time',
    required: false,
    example: '18:00',
  })
  closing_time: string;
}

class CompanyDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Year of creation',
    required: false,
    example: '2011',
  })
  year_of_creation: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Effective',
    required: false,
    default: 0,
    example: 5,
  })
  effective: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Responsible',
    required: false,
    example: 'John Doe 2',
  })
  responsible: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Company activity',
    required: false,
    example: 'Some activity',
  })
  activity: string;

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
    description: 'Trade register number',
    required: true,
    example: 'TR123456789',
  })
  trade_register_number: string;

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

  @IsNotEmpty()
  @ApiProperty({ description: 'Company work schedule' })
  work_schedule: WorkScheduleDto;
}

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
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer typology',
    required: true,
    example: 'Personne physique',
  })
  typology: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Customer address' })
  address: AddressDto;

  @IsNotEmpty()
  @ApiProperty({ description: 'Customer contact' })
  contact: ContactDto;

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ description: 'Customer company' })
  company: CompanyDto;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
}
