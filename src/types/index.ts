export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

export type FilterType = 'All' | TaskStatus;

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
}

export type ViewType = 'list' | 'add' | 'edit';
