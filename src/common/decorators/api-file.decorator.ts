import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { imageAndPdfFileFilter } from '../helpers';
import LocalFilesInterceptor from '../interceptors/local-files.interceptor';

export function ApiFile(
  fieldName: string = 'file',
  required: boolean = false,
  path: string = 'images',
  localOptions?: MulterOptions,
) {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [fieldName]: {
            description: 'Upload a file to the server',
            type: 'string',
            format: 'binary',
            required: required ? [fieldName] : [],
            nullable: !required,
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
