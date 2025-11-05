import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { Task, TaskPriority, TaskStatus } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {
  private mockTasks: Task[] = [
    {
      id: '1',
      title: 'Implementar NgRx Store',
      description: 'Configurar el store principal de la aplicación con NgRx',
      priority: TaskPriority.HIGH,
      status: TaskStatus.DONE,
      dueDate: '2025-11-10',
      createdAt: '2025-11-01',
      updatedAt: '2025-11-03',
      tags: ['ngrx', 'angular', 'state-management'],
      assignedTo: 'user-1'
    },
    {
      id: '2',
      title: 'Crear Effects para API calls',
      description: 'Implementar efectos para manejar llamadas asíncronas',
      priority: TaskPriority.HIGH,
      status: TaskStatus.DEVELOPMENT,
      dueDate: '2025-11-12',
      createdAt: '2025-11-02',
      updatedAt: '2025-11-04',
      tags: ['ngrx', 'effects', 'async'],
      assignedTo: 'user-1'
    },
    {
      id: '3',
      title: 'Implementar Entity Adapter',
      description: 'Usar NgRx Entity para optimizar el manejo de colecciones',
      priority: TaskPriority.MEDIUM,
      status: TaskStatus.TODO,
      dueDate: '2025-11-15',
      createdAt: '2025-11-03',
      updatedAt: '2025-11-03',
      tags: ['ngrx', 'entity', 'optimization'],
      assignedTo: 'user-2'
    },
    {
      id: '4',
      title: 'Configurar Router Store',
      description: 'Integrar el estado del router con NgRx',
      priority: TaskPriority.LOW,
      status: TaskStatus.BACKLOG,
      dueDate: '2025-11-18',
      createdAt: '2025-11-03',
      updatedAt: '2025-11-03',
      tags: ['ngrx', 'router', 'navigation'],
      assignedTo: 'user-3'
    },
    {
      id: '5',
      title: 'Implementar Component Store',
      description: 'Usar Component Store para estado local de componentes',
      priority: TaskPriority.MEDIUM,
      status: TaskStatus.TESTING,
      dueDate: '2025-11-14',
      createdAt: '2025-11-02',
      updatedAt: '2025-11-04',
      tags: ['ngrx', 'component-store', 'local-state'],
      assignedTo: 'user-1'
    },
    {
      id: '6',
      title: 'Integrar Signals Store',
      description: 'Usar la nueva API de NgRx Signals',
      priority: TaskPriority.HIGH,
      status: TaskStatus.DEVELOPMENT,
      dueDate: '2025-11-08',
      createdAt: '2025-11-01',
      updatedAt: '2025-11-04',
      tags: ['ngrx', 'signals', 'modern'],
      assignedTo: 'user-2'
    },
    {
      id: '7',
      title: 'Configurar DevTools',
      description: 'Instalar y configurar Redux DevTools para debugging',
      priority: TaskPriority.MEDIUM,
      status: TaskStatus.BACKLOG,
      dueDate: '2025-11-20',
      createdAt: '2025-11-05',
      updatedAt: '2025-11-05',
      tags: ['ngrx', 'devtools', 'debugging'],
      assignedTo: 'user-2'
    },
    {
      id: '8',
      title: 'Implementar Selectors con createFeature',
      description: 'Usar la nueva API createFeature para generar selectors automáticos',
      priority: TaskPriority.HIGH,
      status: TaskStatus.TODO,
      dueDate: '2025-11-13',
      createdAt: '2025-11-04',
      updatedAt: '2025-11-04',
      tags: ['ngrx', 'selectors', 'optimization'],
      assignedTo: 'user-1'
    },
    {
      id: '9',
      title: 'Testing de Reducers',
      description: 'Escribir tests unitarios para todos los reducers',
      priority: TaskPriority.MEDIUM,
      status: TaskStatus.TESTING,
      dueDate: '2025-11-16',
      createdAt: '2025-11-03',
      updatedAt: '2025-11-05',
      tags: ['testing', 'ngrx', 'quality'],
      assignedTo: 'user-3'
    },
    {
      id: '10',
      title: 'Optimizar Performance con OnPush',
      description: 'Implementar ChangeDetection OnPush en todos los componentes',
      priority: TaskPriority.HIGH,
      status: TaskStatus.DONE,
      dueDate: '2025-11-09',
      createdAt: '2025-11-02',
      updatedAt: '2025-11-04',
      tags: ['performance', 'angular', 'optimization'],
      assignedTo: 'user-1'
    }
  ];

  getTasks(): Observable<Task[]> {
    return of([...this.mockTasks]).pipe(delay(500));
  }

  getTaskById(id: string): Observable<Task> {
    const task = this.mockTasks.find(t => t.id === id);
    if (task) {
      return of({ ...task }).pipe(delay(300));
    }
    return throwError(() => new Error('Task not found'));
  }

  createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Observable<Task> {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.mockTasks.push(newTask);
    return of(newTask).pipe(delay(500));
  }

  updateTask(id: string, updates: Partial<Task>): Observable<Task> {
    const index = this.mockTasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.mockTasks[index] = {
        ...this.mockTasks[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      return of({ ...this.mockTasks[index] }).pipe(delay(500));
    }
    return throwError(() => new Error('Task not found'));
  }

  deleteTask(id: string): Observable<void> {
    const index = this.mockTasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.mockTasks.splice(index, 1);
      return of(undefined).pipe(delay(500));
    }
    return throwError(() => new Error('Task not found'));
  }
}
