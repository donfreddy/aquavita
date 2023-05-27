import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateFountain {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Serial number',
    required: true,
    example: 'BON77878',
  })
  model: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Serial number',
    required: true,
    example: 'BON77878',
  })
  serial_number: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Serial number',
    required: true,
    example: 'BON77878',
  })
  brand: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Delivery date',
    required: true,
    example: '2023-10-03',
  })
  delivery_date: string;
}

export class UpdateFountain extends PartialType(CreateFountain) {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Release date in stock',
    required: false,
    example: '2023-10-03',
  })
  release_date_in_stock: string;
}

export class InstallFountainDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Install date',
    required: true,
    example: '2023-10-03',
  })
  installation_date: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Maintenance interval',
    required: true,
    example: '2023-10-03',
  })
  maintenance_interval: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Upkeep date',
    required: true,
    example: '2023-10-03',
  })
  upkeep_date: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Installed by id',
    required: true,
    example: '1anewrfaw',
  })
  installed_by_id: string;
}
