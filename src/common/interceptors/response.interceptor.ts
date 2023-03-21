import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  mixin,
  Type,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IDefaultResponse } from '../interfaces/response.interface';
import { SuccessResponseDto } from '../dtos/response.dto';
import { EnumStatusCode } from '../helpers';

type InterceptDefaultResponse<T> = NestInterceptor<
  IDefaultResponse<T>,
  SuccessResponseDto<T>
>;

// type InterceptPagedResponse<T> = NestInterceptor<
//   PagedResponse<T>,
//   OKResponseDto<T>
// >;

/**
 * @description
 * This interceptor transform success response without pagination.
 *
 * @docsCategory interceptors
 */
export function DefaultResponseInterceptor<T>(
  message: string,
): Type<InterceptDefaultResponse<T>> {
  @Injectable()
  class MixinDefaultResponseInterceptor implements InterceptDefaultResponse<T> {
    async intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Promise<Observable<SuccessResponseDto<T>>> {
      const statusCode = context.switchToHttp().getResponse().statusCode as number;

      return next.handle().pipe(
        map((value: IDefaultResponse<T>) => ({
          status_code: EnumStatusCode.SUCCESS,
          status: statusCode,
          message: message ? message : 'Success',
          data: value,
        })),
      );
    }
  }

  return mixin(MixinDefaultResponseInterceptor);
}

//
// /**
//  * @description
//  * This interceptor transform success response with pagination.
//  *
//  * @docsCategory interceptors
//  */
// export function PagedResponseInterceptor<T>(
//   msg: IResponseMessage,
// ): Type<InterceptPagedResponse<T>> {
//   @Injectable()
//   class MixinPagedResponseInterceptor implements InterceptPagedResponse<T> {
//     constructor(private readonly i18n: I18nService) {}
//
//     async intercept(
//       context: ExecutionContext,
//       next: CallHandler,
//     ): Promise<Observable<OKResponseDto<T>>> {
//       const ctx = context.switchToHttp();
//       const currentLang: string = ctx.getRequest().i18nLang;
//       const statusCode: number = ctx.getResponse().statusCode;
//       const message: string = await this.i18n.t(msg.key, {
//         lang: currentLang,
//         args: msg.args,
//       });
//
//       return next.handle().pipe(
//         map((value: PagedResponse<T>) => ({
//           status_code: statusCode,
//           message,
//           data: value,
//         })),
//       );
//     }
//   }
//
//   return mixin(MixinPagedResponseInterceptor);
// }
