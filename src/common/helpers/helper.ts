import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as JSZip from 'jszip';
import * as AdmZip from 'adm-zip';
import slugify from 'slugify';
import * as shortid from 'shortid';

import { HttpException } from '@nestjs/common';

// Define the salt length for the hash
const saltRounds = 10;

/**
 * Hash password using bcrypt.
 *
 * @param password Password
 *
 * @returns {Promise<string>} Hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};

/**
 * Compare password with hashed password.
 *
 * @param userPassword User password
 * @param currentPassword Current password
 *
 * @returns {Promise<boolean>} True if password matches, false otherwise
 */
export const comparePasswords = async (
  userPassword: string,
  currentPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(userPassword, currentPassword);
};

export const codeOrIdWhereCondition = (
  code: string,
): { [key: string]: string | number } => {
  const id = parseInt(code);
  if (isNaN(id)) return { code };
  return { id };
};

/**
 * Generate unique code with prefix provide
 *
 * @param prefix Prefix
 *
 * @returns {Promise<string>} Hashed password
 */
export const getUniqueCode = (prefix: string): string => {
  return `${prefix}${generateOtpCode(4)}`;
};


/**
 * Generate a unique key based on current time and random string.
 *
 * @returns {string} Unique key
 */
export const generateUniqueKey = (): string => {
  const currentTime = new Date().getTime().toString();
  const randomString =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  return `${randomString}_${currentTime}`;
};

/**
 * Generate an OTP code with a given number of digits
 *
 * @param digit number of digits
 *
 * @returns {string} OTP code
 */
export const generateOtpCode = (digit = 6): string => {
  const digits = '0123456789';
  let otpCode = '';

  for (let i = 0; i < digit; i++) {
    otpCode += digits[Math.floor(Math.random() * 10)];
  }
  return otpCode;
};

/**
 * Get pagination limit if is more thant 100 return 100
 *
 * @param {number} limit Pagination to check limit
 */
export const getPaginationLimit = (limit: number): number => {
  return limit > 100 ? 100 : limit;
};

export const removeFile = (filePath: string): void => {
  fs.unlink(filePath, (err) => {
    if (err) {
      throw new HttpException('Error deleting file', 500);
    }
  });
};

/**
 * Slugify a string and append a shortid to it
 *
 * @param slug string to slugify
 *
 * @returns {string} slugified string
 */
export const slugifyString = (slug: string): string => {
  return `${slugify(slug) + `-${shortid.generate()}`}`.toLowerCase();
};

/**
 * Create a zip file from a list of files
 *
 * @param files list of files
 *
 * @returns {Promise<Uint8Array>} zip file
 */
export const createZipFile = async (files: string[]): Promise<any> => {
  // console.log(files);
  // // Create a new zip file
  // const zip = new JSZip();

  // zip.file('file1.txt', 'Hello World');
  // zip.file('file2.txt', 'Bonjour le monde');

  // // Add files to the zip file
  // //files.forEach((file) => {zip.file(file)});

  // var promise = null;
  // if (JSZip.support.uint8array) {
  //   promise = zip.generateAsync({ type: 'uint8array' });
  // } else {
  //   promise = zip.generateAsync({ type: 'string' });
  // }

  // return promise;
  try {
    const zip = new AdmZip();
    const outputFile = 'hello-world.zip';

    zip.writeZip(outputFile);
    console.log(`Created ${outputFile} successfully`);
    zip.addFile('text/test.txt', Buffer.from('Hello World'));
    zip.getEntries().forEach(function(zipEntry) {
      console.log(zipEntry.toString()); // outputs zip entries information
    });
    const zipCount = zip.getEntryCount();
    console.log(`Zip Count: ${zipCount}`);

  } catch (e) {
    console.log(`Something went wrong. ${e}`);
  }
};

/**
 * Get the current date in 24-hour format
 *
 * @returns
 */
export const formatTime24 = (): string => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};