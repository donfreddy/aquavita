import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreatePurchaseOrder {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Purchase order name',
    required: true,
    example: 'Orange Cameroon',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Purchase order number',
    required: true,
    example: 'BON77878',
  })
  po_number: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Purchase order amount',
    required: true,
    example: '12500000',
  })
  amount: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Issue day',
    required: true,
    example: '2023-10-03',
  })
  issue_day: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Filename',
    required: false,
    example: '0-module-zhw.jpg',
  })
  filename: string;
}

export class UpdatePurchaseOrder extends PartialType(CreatePurchaseOrder) {

}