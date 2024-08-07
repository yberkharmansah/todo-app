import { SubTask } from './subtask.model';

export interface Todo {
  todo_id: number;
  title: string;
  subtasks: SubTask[]; // Alt görevlerin bulunduğu dizi
  // Diğer todo özellikleri eklenebilir
}