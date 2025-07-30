import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * 统一响应格式拦截器
 * 用于将所有API响应转换为统一格式
 */
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // 获取请求上下文
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const statusCode = response.statusCode;

        // 统一响应格式
        return {
          code: statusCode,
          success: statusCode >= 200 && statusCode < 300,
          message: statusCode >= 200 && statusCode < 300 ? '成功' : '失败',
          data: data,
        };
      }),
    );
  }
}