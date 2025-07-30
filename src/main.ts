import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * 应用启动函数
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
