import { ApiProperty } from '@nestjs/swagger';

/**
 * 创建待办事项的 DTO
 */
export class CreateTodoDto {
  /**
   * 待办事项的标题
   * @example 学习 NestJS
   */
  @ApiProperty({
    description: '待办事项的标题',
    example: '学习 NestJS',
    required: true,
  })
  title: string;

  /**
   * 待办事项的描述
   * @example 完成 NestJS 基础教程
   */
  @ApiProperty({
    description: '待办事项的描述',
    example: '完成 NestJS 基础教程',
    required: false,
  })
  description?: string;

  /**
   * 待办事项的完成状态
   * @example false
   */
  @ApiProperty({
    description: '待办事项的完成状态',
    example: false,
    required: false,
    default: false,
  })
  completed?: boolean;
}