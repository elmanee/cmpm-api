import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma.service';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly prisma: PrismaService) {}

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal Server Error';


    // FIXME: Alamacenar la informacion en base de datos

    const errorBody = typeof message === 'string'
      ? message
      : (message as any).message || JSON.stringify(message);

    const errorCode = (exception as any).errorCode || 'UNKNOWN_ERROR';

    const userId = (request as any).user?.id;

    try {
      await this.prisma.logs.create({
        data: {
          statusCode: status,
          timestamp: new Date(),
          path: request.url,
          error: errorBody,
          errorCode: errorCode,
          session_id: userId || null,
        }
      })
    } catch (error) {
      console.error('error al guardar logs',error);
      
    }

    response.status(status as any).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error:
        typeof message === 'string'
          ? message
          : (message as any).message || message,
      errorCode: (exception as any).errorCode || 'UNKNOWN_ERROR',
    } as any);
  }
}
