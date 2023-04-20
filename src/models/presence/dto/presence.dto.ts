import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EnumCarboyType, EnumPresenceStatus } from '../../../common/helpers';

export class CreatePresenceDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'User id',
    required: true,
    example: '3h4l23hj4h',
  })
  user_id: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Visitor name',
    required: false,
    example: 'John Doe',
  })
  visitor_name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Visitor phone number',
    required: false,
    example: '0123456789',
  })
  visitor_phone_number: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Is visitor',
    required: true,
    example: true,
  })
  is_visitor: boolean;

  @IsEnum(EnumCarboyType)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Presence status',
    required: true,
    example: EnumPresenceStatus.PRESENT,
  })
  status: EnumPresenceStatus;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Motif of presence',
    required: false,
    example: 'Go out for take a break',
  })
  motif: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Date',
    required: true,
    example: '2023-10-03',
  })
  date: Date;
}