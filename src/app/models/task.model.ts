export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  assignedTo?: string;
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export enum TaskStatus {
  BACKLOG = 'BACKLOG',
  TODO = 'TODO',
  DEVELOPMENT = 'DEVELOPMENT',
  TESTING = 'TESTING',
  DONE = 'DONE'
}

export interface TaskFilter {
  status?: TaskStatus;
  priority?: TaskPriority;
  searchTerm?: string;
  tags?: string[];
}
