import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

/**
 * Todo 控制器，处理待办事项的 CRUD 操作
 */
@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  /**
   * 创建新的待办事项
   * @param createTodoDto 待办事项数据
   * @returns 创建的待办事项
   */
  @ApiOperation({
    summary: '创建新的待办事项',
    description: '添加一个新的待办事项到系统中',
  })
  @ApiResponse({
    status: 201,
    description: '待办事项创建成功',
  })
  @ApiResponse({
    status: 400,
    description: '请求参数无效',
  })
  @ApiBody({
    type: CreateTodoDto,
    description: '待办事项创建数据',
  })
  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  /**
   * 获取所有待办事项
   * @returns 待办事项列表
   */
  @ApiOperation({
    summary: '获取所有待办事项',
    description: '检索系统中的所有待办事项',
  })
  @ApiResponse({
    status: 200,
    description: '成功获取待办事项列表',
  })
  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  /**
   * 获取单个待办事项
   * @param id 待办事项 ID
   * @returns 单个待办事项
   */
  @ApiOperation({
    summary: '获取单个待办事项',
    description: '根据 ID 检索特定的待办事项',
  })
  @ApiParam({
    name: 'id',
    description: '待办事项的唯一标识符',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: '成功获取待办事项',
  })
  @ApiResponse({
    status: 404,
    description: '未找到指定的待办事项',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  /**
   * 更新待办事项
   * @param id 待办事项 ID
   * @param updateTodoDto 更新的数据
   * @returns 更新后的待办事项
   */
  @ApiOperation({
    summary: '更新待办事项',
    description: '修改指定 ID 的待办事项信息',
  })
  @ApiParam({
    name: 'id',
    description: '待办事项的唯一标识符',
    example: 1,
  })
  @ApiBody({
    type: UpdateTodoDto,
    description: '待办事项更新数据',
  })
  @ApiResponse({
    status: 200,
    description: '待办事项更新成功',
  })
  @ApiResponse({
    status: 400,
    description: '请求参数无效',
  })
  @ApiResponse({
    status: 404,
    description: '未找到指定的待办事项',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  /**
   * 删除待办事项
   * @param id 待办事项 ID
   * @returns 删除结果
   */
  @ApiOperation({
    summary: '删除待办事项',
    description: '从系统中删除指定 ID 的待办事项',
  })
  @ApiParam({
    name: 'id',
    description: '待办事项的唯一标识符',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: '待办事项删除成功',
  })
  @ApiResponse({
    status: 404,
    description: '未找到指定的待办事项',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
