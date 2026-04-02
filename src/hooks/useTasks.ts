import { useCallback } from 'react';
import type { Task, TaskFormData, TaskStatus } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { generateId} from '../utils';

const STORAGE_KEY = 'todo_app_tasks_v1';

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEY,[]);

  const addTask = useCallback((data: Pick<TaskFormData, 'title' | 'description'>) => {
    const newTask: Task = {
      id: generateId(),
      title: data.title.trim(),
      description: data.description.trim(),
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
    return newTask;
  }, [setTasks]);

  const updateTask = useCallback((id: string, data: TaskFormData) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id
          ? { ...t, title: data.title.trim(), description: data.description.trim(), status: data.status }
          : t
      )
    );
  }, [setTasks]);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, [setTasks]);

  const getTasksByStatus = useCallback(
    (status: TaskStatus) => tasks.filter(t => t.status === status),
    [tasks]
  );

  return { tasks, addTask, updateTask, deleteTask, getTasksByStatus };
}
