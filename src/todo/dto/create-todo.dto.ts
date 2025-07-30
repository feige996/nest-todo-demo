import { ApiProperty } from '@nestjs/swagger';

/**
 * 创建待办事项的 DTO
 */
export class CreateTodoDto {
  /**
   * 待办事项的名称
   * @example 学习 NestJS
   */
  @ApiProperty({
    description: '待办事项的名称',
    example: '学习 NestJS',
    required: true,
  })
  name: string;

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
  done?: boolean;
}