import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateStock {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Stock label',
    required: true,
    example: 'Machines',
  })
  label: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Stock quantity',
    required: true,
    example: '78',
  })
  quantity: string;
}

export class UpdateStock extends PartialType(CreateStock) {

}