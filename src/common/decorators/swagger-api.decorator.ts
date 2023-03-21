import { applyDecorators } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { ErrorResponseDto, SuccessResponseDto } from '../dtos/response.dto';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../constants';

export function SwaggerApiResponse() {
  return applyDecorators(
    ApiOkResponse({ type: SuccessResponseDto }),
    ApiInternalServerErrorResponse({ type: ErrorResponseDto }),
  );
}

export function SwaggerApiPagedResponse() {
  return applyDecorators(
    ApiQuery({
      name: 'page',
      required: false,
      description: `Number of page to get and default value is ${DEFAULT_PAGE}`,
      example: '1',
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      description: `Number of items per page and default is ${DEFAULT_LIMIT}. Max is 100`,
      example: '10',
    })
  );
}