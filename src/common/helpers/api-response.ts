import { EnumStatusCode } from './enum.helper';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

abstract class ApiResponse {
  protected constructor(
    protected status_code: EnumStatusCode,
    protected status: HttpStatus,
    protected message: string,
  ) {}

  protected prepare<T extends ApiResponse>(
    res: Response,
    response: T,
  ): Response {
    return res.status(this.status).json(ApiResponse.sanitize(response));
  }

  public send(res: Response): Response {
    return this.prepare<ApiResponse>(res, this);
  }

  private static sanitize<T extends ApiResponse>(response: T): T {
    const clone: T = {} as T;
    Object.assign(clone, response);
    delete clone.status_code;
    for (const i in clone) {
      if (typeof clone[i] === 'undefined') delete clone[i];
    }
    return clone;
  }
}

export class AuthFailureResponse extends ApiResponse {
  constructor(message = 'Authentication Failure') {
    super(EnumStatusCode.FAILURE, HttpStatus.UNAUTHORIZED, message);
  }
}

export class NotFoundResponse extends ApiResponse {
  private url: string | undefined;

  constructor(message = 'Not Found') {
    super(EnumStatusCode.FAILURE, HttpStatus.NOT_FOUND, message);
  }

  send(res: Response): Response {
    this.url = res.req?.originalUrl;
    return super.prepare<NotFoundResponse>(res, this);
  }
}

export class ForbiddenResponse extends ApiResponse {
  constructor(message = 'Forbidden') {
    super(EnumStatusCode.FAILURE, HttpStatus.FORBIDDEN, message);
  }
}

export class BadRequestResponse extends ApiResponse {
  constructor(message = 'Bad Parameters') {
    super(EnumStatusCode.FAILURE, HttpStatus.BAD_REQUEST, message);
  }
}

export class InternalErrorResponse extends ApiResponse {
  constructor(message = 'Internal Error') {
    super(EnumStatusCode.FAILURE, HttpStatus.INTERNAL_SERVER_ERROR, message);
  }
}

export class SuccessResponse<T> extends ApiResponse {
  constructor(message: string, private data: T) {
    super(EnumStatusCode.SUCCESS, HttpStatus.OK, message);
  }

  send(res: Response): Response {
    return super.prepare<ApiResponse>(res, this);
  }
}
