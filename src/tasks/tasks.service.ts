import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id: string) {
    const task = this.tasks.find((task) => task.id === id);

    return task;
  }

  deleteTaskById(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);

    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    this.tasks[taskIndex].status = status;

    return this.tasks[taskIndex];
  }
}
