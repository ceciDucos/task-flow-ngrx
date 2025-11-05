import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { TaskListStore } from '../../store/component-stores/task-list.store';
import { NotificationStore } from '../../store/signals/notification.store';
import { 
  selectTasksByStatus, 
  selectTaskLoading 
} from '../../store/tasks/task.selectors';
import * as TaskActions from '../../store/tasks/task.actions';
import { TaskStatus, TaskPriority } from '../../models/task.model';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule, MatIconModule, TranslateModule],
  providers: [TaskListStore],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss'
})
export class KanbanComponent implements OnInit {
  private store = inject(Store);
  taskListStore = inject(TaskListStore);
  notificationStore = inject(NotificationStore);

  tasksByStatus$ = this.store.select(selectTasksByStatus);
  loading$ = this.store.select(selectTaskLoading);

  TaskStatus = TaskStatus;
  TaskPriority = TaskPriority;

  ngOnInit() {
    this.store.dispatch(TaskActions.loadTasks());
  }

  onStatusChange(taskId: string, newStatus: TaskStatus) {
    this.store.dispatch(
      TaskActions.updateTask({ 
        id: taskId, 
        updates: { status: newStatus } 
      })
    );
    
    this.notificationStore.addNotification({
      type: 'success',
      message: `Task status updated to ${newStatus}`
    });
  }

  onDeleteTask(taskId: string) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.store.dispatch(TaskActions.deleteTask({ id: taskId }));
      
      this.notificationStore.addNotification({
        type: 'info',
        message: 'Task deleted successfully'
      });
    }
  }

  getPriorityClass(priority: TaskPriority): string {
    return `task-card__priority--${priority}`;
  }

  getStatusLabel(status: TaskStatus): string {
    const labels = {
      [TaskStatus.BACKLOG]: 'Backlog',
      [TaskStatus.TODO]: 'To Do',
      [TaskStatus.DEVELOPMENT]: 'Development',
      [TaskStatus.TESTING]: 'Testing',
      [TaskStatus.DONE]: 'Done'
    };
    return labels[status];
  }
}
