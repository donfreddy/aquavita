import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { EnumInvoicingProfile } from '../../../common/helpers';

export class FountainDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Maintenance interval',
    required: true,
    example: '20',
  })
  maintenance_interval: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Fountain id',
    required: true,
    example: '1anewrfaw',
  })
  fountain_id: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Delivery site id',
    required: true,
    example: '1anewrfaw',
  })
  delivery_site_id: string;
}

export class CreateContractDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Customer id',
    required: true,
    example: '0re8g0sfd9fg',
  })
  customer_id: string;

  @IsEnum(EnumInvoicingProfile)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Invoicing profile',
    required: true,
    example: EnumInvoicingProfile.CONTRACT,
  })
  invoicing_profile: EnumInvoicingProfile;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Customer phone number',
    example: '0',
  })
  amount: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Amount carboy',
    example: '25000',
  })
  amount_carboy: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Invoiced amount per month',
    required: false,
    example: '0',
  })
  invoiced_amount_per_month: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Effective date',
    required: false,
    example: '2022-08-01',
  })
  effective_date: string;

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Signed and classified',
    required: false,
    default: true,
    example: true,
  })
  signed_and_classified: boolean;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Number of carboys per week',
    required: false,
    default: 0,
    example: 2,
  })
  carboys_per_week: number;

  @IsArray()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    type: FountainDto,
    isArray: true,
    required:false
  })
  fountains: FountainDto[];

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Array of delivery site ID',
    required: true,
    example: ['0re8g0sfd9fg', '0re8g0sfd9fg'],
  })
  delivery_site_ids: string[];
}

export class UpdateContractDto extends PartialType(CreateContractDto) {
}

export class TerminatedDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Termination date',
    required: false,
    example: '2022-08-01',
  })
  termination_date: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Termination raison',
    required: false,
    example: null,
  })
  termination_raison: string;
}
