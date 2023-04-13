import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { EnumMaterialType } from '../../../common/helpers';
import { User } from '../../user/entities/user.entity';

export class CreateMaterialDto {
  @IsEnum(EnumMaterialType)
  @ApiProperty({
    description: 'Material type',
    enum: EnumMaterialType,
    default: EnumMaterialType.PLANT,
  })
  type: EnumMaterialType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Material quantity',
    example: '10',
  })
  quantity: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Delivery note',
    example: 'BON77878',
  })
  delivery_note: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Release date',
    example: '2023-10-03',
  })
  release_date: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Exit date',
    example: '2023-10-03',
  })
  exit_date: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'State of material',
    example: 'Good',
  })
  state_of_material: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Vehicle',
    example: 'BON77878',
  })
  vehicle: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Driver id',
    required: true,
    example: '0re8g0sfd9fg',
  })
  driver_id: User;
}

export class UpdateMaterialDto extends PartialType(CreateMaterialDto) {
}