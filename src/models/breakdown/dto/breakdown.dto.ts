import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreatBreakdown {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Breakdown name',
    required: true,
    example: 'Panne moteur',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Breakdown description',
    required: true,
    example: 'Some description',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Breakdown tracking time',
    required: true,
    example: '',
  })
  tracking_time: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'breakdown type',
    required: true,
    example: 'Roulement',
  })
  type: string;
}

export class UpdateBreakdown extends PartialType(CreatBreakdown) {

}