import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    response
      .status(status)
      .json({
        status: false,
        message: typeof exceptionResponse === 'string' ? exceptionResponse : exceptionResponse['message'],
        errors: typeof exceptionResponse === 'object' ? exceptionResponse['errors'] : null
      });
  }
}