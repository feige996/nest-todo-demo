import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { ApiProperty } from '@nestjs/swagger';

/**
 * 更新待办事项的 DTO
 */
export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  /**
   * 待办事项的 ID
   * @example 1
   */
  @ApiProperty({
    description: '待办事项的 ID',
    example: 1,
    required: true,
  })
  id: number;
}
