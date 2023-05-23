import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { EnumInvoicingProfile } from '../../../common/helpers';

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
  @ApiProperty({
    description: 'Customer phone number',
    example: '0',
  })
  amount: string;

  @IsString()
  @IsNotEmpty()
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

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Tell if a contract is terminate or not',
    required: false,
    default: true,
    example: true,
  })
  is_terminated: boolean;

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

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Number of fountains placed',
    required: false,
    default: 0,
    example: 1,
  })
  placed_fountain: number;
}

export class UpdateContractDto extends PartialType(CreateContractDto) {
}
