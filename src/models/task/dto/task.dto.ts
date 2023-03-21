import { EnumTaskStatus } from './../../../common/helpers/enum.helper';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({  
    description: 'Task name',
    required: true,
    example: 'Task 1',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Task description',
    required: false,
    example: 'Task description',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Task due date',
    required: false,
    example: '2021-01-01',
  })
  due_date: string;

  @IsEnum(EnumTaskStatus)
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Task status',
    required: false,
    example: EnumTaskStatus.TO_DO,
  })
  status: EnumTaskStatus;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    description: 'Task user id',
    required: true,
    example: '1anewrfaw',
  })
  user_id: string;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {

}
