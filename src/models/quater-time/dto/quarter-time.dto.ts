import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateQuarterTime {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Start quarter time date',
    required: true,
    example: '6h',
  })
  start_time: string;


  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'End quarter time date',
    required: true,
    example: '14h',
  })
  end_time: string;
}

export class UpdateQuarterTime extends PartialType(CreateQuarterTime) {

}

export class CreateQuarterTimePlannings {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Start quarter-time date',
    required: true,
    example: '2021-01-01',
  })
  start_date: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'End quarter-time date',
    required: true,
    example: '2021-01-01',
  })
  end_date: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    isArray: true,
    description: 'Array of users id',
    required: true,
    example: ['1', '2', '3'],
  })
  teams: string[];

  // get leader id
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Leader id',
    required: true,
    example: '1',
  })
  leader: string;
}

export class UpdateQuarterTimePlannings extends PartialType(CreateQuarterTimePlannings) {

}

export class UpdateQuarterPlanning {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Start quarter-time date',
    required: true,
    example: '2021-01-01',
  })
  start_date: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'End quarter-time date',
    required: true,
    example: '2021-01-01',
  })
  end_date: string;
}

