import {
  applyDecorators,
  ClassSerializerInterceptor,
  HttpCode,
  HttpStatus,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../exceptions/filters/exception.filter';
import { DefaultResponseInterceptor } from '../interceptors/response.interceptor';

// eslint-disable-next-line @typescript-eslint/ban-types
export type IAuthApplyDecorator = <TFunction extends Function, Y>(
  target: Record<string, any> | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void;

/**
 * @description
 * This is api response decorator.
 *
 * @docsCategory decorators
 */
export function ApiResponse(
  message?: string,
  httpCode?: HttpStatus,
): IAuthApplyDecorator {
  return applyDecorators(
    UseInterceptors(
      ClassSerializerInterceptor,
      DefaultResponseInterceptor(message),
    ),
    HttpCode(httpCode),
    UseFilters(HttpExceptionFilter),
  );
}

// /**
//  * @description
//  * This is paged response decorator.
//  *
//  * @docsCategory decorators
//  */
// export function PagedResponse(
//   msg: IResponseMessage,
//   httpCode?: HttpStatus,
// ): IAuthApplyDecorator {
//   return applyDecorators(
//     UseInterceptors(
//       ClassSerializerInterceptor,
//       PagedResponseInterceptor(msg),
//     ),
//     HttpCode(httpCode),
//     UseFilters(HttpExceptionFilter),
//   );
// }