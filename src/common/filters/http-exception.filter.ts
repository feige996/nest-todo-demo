import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * HTTP异常过滤器
 * 用于统一处理所有HTTP异常响应格式
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // 提取错误信息
    let message = '请求失败';
    let errorData = null;

    if (typeof exceptionResponse === 'object') {
      message = (exceptionResponse as any).message || message;
      errorData = (exceptionResponse as any).error || null;
    } else if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    }

    // 统一错误响应格式
    response.status(status).json({
      code: status,
      success: false,
      message: message,
      data: errorData,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}