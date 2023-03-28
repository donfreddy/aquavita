import { Request } from 'express';
import { configService } from 'src/config/config.service';
import { slugifyString } from './helper';
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';

/**
 * Filter for image and pdf files
 *
 * @param {Request} _req Request object
 * @param {Express.Multer.File} file File object
 * @param {CallableFunction} callback Callback function
 *
 * @returns {void}
 */
export const imageAndPdfFileFilter = (
  _req: Request,
  file: Express.Multer.File,
  callback: (error: BadRequestException | null, acceptFile: boolean) => void,
): void => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
    return callback(
      new BadRequestException(
        'Only image and PDF files are allowed! (jpg, jpeg, png, pdf)',
      ),
      false,
    );
  }
  callback(null, true);
};

/**
 * Edit file name
 *
 * @param {Request} _req Request object
 * @param {Express.Multer.File} file File object
 * @param {CallableFunction} callback Callback function
 *
 * @returns {void}
 */
export const editFileName = (
  _req: Request,
  file: Express.Multer.File,
  callback: (error: BadRequestException | null, filename: string) => void,
): void => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  callback(null, `${slugifyString(name)}${fileExtName}`);
};

/**
 * Get Image Url from file name.
 *
 * @param fileName File name of the image
 *
 * @returns {string} Image Url
 */
export const getImageUrl = (fileName: string): string => {
  return `${configService.getApiBaseUrl()}/images/${fileName}`;
};
