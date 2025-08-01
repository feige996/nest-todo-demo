import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

/**
 * 应用启动函数
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 配置跨域访问
  app.enableCors({
    origin: '*', // 允许所有来源，生产环境应限制具体域名
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 注册全局响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());

  // 注册全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 配置 Swagger 文档
  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('Todo 应用的 API 文档')
    .setVersion('1.0')
    .addTag('todo')
    .build();

  // 创建 Swagger 文档
  const document = SwaggerModule.createDocument(app, config);
  // 设置 Swagger UI 访问路径
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`应用运行在: http://localhost:${port}`);
  console.log(`Swagger 文档地址: http://localhost:${port}/api`);
}
bootstrap();
