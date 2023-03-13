/* eslint-disable array-callback-return */
import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // Check if is empty
    if (value instanceof Object && this.isEmpty(value)) {
      throw new BadRequestException('Validation failed: No body submitted');
    }

    // destructuring metadata
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);

    const rawErrors: Record<string, any>[] = await validate(object);
    if (rawErrors.length > 0) {
      // this.messageService.getRequestErrorsMessage(rawErrors);
      throw new BadRequestException(`${this.formatErrors(rawErrors)}`);
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: any[]) {
    return errors
      .map((err) => {
        // eslint-disable-next-line guard-for-in
        for (const property in err.constraints) {
          return err.constraints[property];
        }
      })
      .join(', ');
  }

  private isEmpty(value: any) {
    return Object.keys(value).length <= 0;
  }
}
