import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

/**
 * 待办事项服务类，实现基于内存的 CRUD 操作
 */
@Injectable()
export class TodoService {
  // 内存存储的待办事项列表
  private todoList = [
    { id: 1, name: '学习 NestJS', done: false },
    { id: 2, name: '完成项目文档', done: true },
    { id: 3, name: '修复登录 bug', done: false },
    { id: 4, name: '准备周会演示', done: false },
    { id: 5, name: '更新依赖包', done: true },
  ];

  /**
   * 创建新的待办事项
   * @param createTodoDto 创建待办事项的数据
   * @returns 创建的待办事项
   */
  create(createTodoDto: CreateTodoDto) {
    const newTodo = {
      id: this.todoList.length > 0 ? Math.max(...this.todoList.map(todo => todo.id)) + 1 : 1,
      name: createTodoDto.name,
      done: createTodoDto.done ?? false,
    };
    this.todoList.push(newTodo);
    return newTodo;
  }

  /**
   * 获取所有待办事项
   * @returns 待办事项列表
   */
  findAll() {
    return this.todoList;
  }

  /**
   * 根据 ID 获取单个待办事项
   * @param id 待办事项 ID
   * @returns 找到的待办事项或 undefined
   */
  findOne(id: number) {
    return this.todoList.find(todo => todo.id === id);
  }

  /**
   * 更新待办事项
   * @param id 待办事项 ID
   * @param updateTodoDto 更新的数据
   * @returns 更新后的待办事项或 undefined
   */
  update(id: number, updateTodoDto: UpdateTodoDto) {
    const index = this.todoList.findIndex(todo => todo.id === id);
    if (index === -1) {
      return undefined;
    }

    const updatedTodo = {
      ...this.todoList[index],
      name: updateTodoDto.name ?? this.todoList[index].name,
      done: updateTodoDto.done !== undefined ? updateTodoDto.done : this.todoList[index].done,
    };

    this.todoList[index] = updatedTodo;
    return updatedTodo;
  }

  /**
   * 删除待办事项
   * @param id 待办事项 ID
   * @returns 是否删除成功
   */
  remove(id: number) {
    const index = this.todoList.findIndex(todo => todo.id === id);
    if (index === -1) {
      return false;
    }

    this.todoList.splice(index, 1);
    return true;
  }
}
