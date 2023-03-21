import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { imageAndPdfFileFilter } from '../helpers';
import LocalFilesInterceptor from '../interceptors/local-files.interceptor';

export function ApiFiles(
  fieldName = 'files',
  required = false,
  path = 'images',
  localOptions?: MulterOptions,
) {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        required: required ? [fieldName] : [],
        properties: {
          [fieldName]: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary',
              nullable: !required,
            },
          },
        },
      },
    }),
    UseInterceptors(
      LocalFilesInterceptor({
        fieldName: fieldName,
        path: path,
        fileFilter: imageAndPdfFileFilter,
        ...localOptions,
      }),
    ),
  );
}
