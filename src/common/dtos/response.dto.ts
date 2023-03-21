import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { EnumStatusCode } from '../helpers';
import { IDefaultResponse } from '../interfaces/response.interface';

export class SuccessResponseDto<T> {
  @ApiProperty({ example: EnumStatusCode.SUCCESS, enum: EnumStatusCode })
  status_code: EnumStatusCode;

  @ApiProperty({ example: '200|201', enum: HttpStatus })
  status: HttpStatus;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: IDefaultResponse<T>;
}

export class ErrorResponseDto {
  @ApiProperty({ type: 'number', example: '10000|10001|10002|10003' })
  status_code: number;

  @ApiProperty({ enum: HttpStatus, example: '400|401|404|409|500' })
  status: HttpStatus;

  @ApiProperty({
    type: 'string',
    example:
      'Bad Request | Unauthorized | Not Found | Conflict | Internal Error | ...',
  })
  message: string;
}
