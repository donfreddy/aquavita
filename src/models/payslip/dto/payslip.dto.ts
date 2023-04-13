import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';


export class CreatePayslipDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Employee id',
    required: true,
    example: '0re8g0sfd9fg',
  })
  employee_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Salary',
    required: true,
    example: '12500000',
  })
  salary: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Month',
    required: true,
    example: '2023-10-03',
  })
  date: string;
}

export class UpdatePayslipDto extends PartialType(CreatePayslipDto) {}