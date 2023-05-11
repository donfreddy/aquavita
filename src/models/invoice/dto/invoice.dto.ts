import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsBoolean, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  EnumConsumptionType, EnumInvoiceMostOrHave, EnumInvoiceStatus,
  EnumInvoiceType, EnumPaymentMethod, EnumProductType,
} from '../../../common/helpers';

export class CreateInvoiceDto {

  @IsEnum(EnumInvoiceType)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Invoice type',
    required: true,
    example: EnumInvoiceType.CONSUMPTION,
  })
  type: EnumInvoiceType;

  @IsEnum(EnumConsumptionType)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Invoice most or have',
    required: true,
    example: EnumConsumptionType.MONTHLY,
  })
  consumption_type: EnumConsumptionType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Payment date',
    required: false,
    example: '2022-08-01',
  })
  payment_date: string;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Apply TVA',
    required: false,
    default: false,
    example: false,
  })
  apply_tva: boolean;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Amount in letters',
    required: false,
    example: 'Six cent vingt trois milles deux cent cinquante',
  })
  amount_in_letters: string;

  @IsEnum(EnumInvoiceMostOrHave)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Invoice most or have',
    required: true,
    example: EnumInvoiceMostOrHave.MOST,
  })
  most_or_have: EnumInvoiceMostOrHave;

  @IsEnum(EnumProductType)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer type',
    required: true,
    example: EnumProductType.CARBOYS,
  })
  product_type: EnumProductType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer id',
    required: true,
    example: '2314hl12hh42j3hl432',
  })
  customer_id: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Number of bon per week',
    required: false,
    default: 0,
    example: 6,
  })
  bon_count_per_week: number;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Number of fountains',
    required: false,
    default: 0,
    example: 6,
  })
  fountain_count: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Settlement date',
    required: false,
    example: '2022-08-01',
  })
  settlement_date: Date;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Settlement reference',
    required: false,
    example: 'WQER-1234-ASDF-5678',
  })
  settlement_reference: string;

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'References',
    example: ['bon ccde', 'ect..'],
    required: false,
  })
  references: string[];

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Amount excluding taxes',
    required: false,
    default: 0,
    example: 324832,
  })
  amount_excluding_taxes: number;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Amount including taxes',
    required: false,
    default: 0,
    example: 833209,
  })
  amount_including_taxes: number;


  @IsEnum(EnumPaymentMethod)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Payment method',
    required: false,
    default: null,
    example: EnumPaymentMethod.CASH,
  })
  payment_method: EnumPaymentMethod;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Array of delivery slips ids',
    required: true,
    example: ['0re8g0sfd9fg', '0re8g0sfd9fg'],
  })
  delivery_slips_ids: string[];
}

export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {
  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Is archived',
    required: false,
    default: false,
    example: false,
  })
  is_archived: boolean;

  @IsEnum(EnumInvoiceStatus)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Invoice status',
    required: true,
    example: EnumInvoiceStatus.UNPAID,
  })
  status: EnumInvoiceStatus;
}