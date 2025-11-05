import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { 
  selectFilteredTasks, 
  selectTaskLoading,
  selectTaskFilter,
  selectAllTags
} from '../../store/tasks/task.selectors';
import * as TaskActions from '../../store/tasks/task.actions';
import { TaskStatus, TaskPriority } from '../../models/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, TranslateModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  private store = inject(Store);

  tasks$ = this.store.select(selectFilteredTasks);
  loading$ = this.store.select(selectTaskLoading);
  currentFilter$ = this.store.select(selectTaskFilter);
  availableTags$ = this.store.select(selectAllTags);

  TaskStatus = TaskStatus;
  TaskPriority = TaskPriority;

  searchTerm = signal('');
  selectedStatus = signal<TaskStatus | ''>('');
  selectedPriority = signal<TaskPriority | ''>('');
  selectedTags = signal<string[]>([]);

  ngOnInit() {
    this.store.dispatch(TaskActions.loadTasks());
  }

  applyFilter() {
    const filter: any = {};
    
    if (this.searchTerm()) {
      filter.searchTerm = this.searchTerm();
    }
    
    if (this.selectedStatus()) {
      filter.status = this.selectedStatus();
    }
    
    if (this.selectedPriority()) {
      filter.priority = this.selectedPriority();
    }
    
    if (this.selectedTags().length > 0) {
      filter.tags = this.selectedTags();
    }

    this.store.dispatch(TaskActions.setTaskFilter({ filter }));
  }

  clearFilters() {
    this.searchTerm.set('');
    this.selectedStatus.set('');
    this.selectedPriority.set('');
    this.selectedTags.set([]);
    
    this.store.dispatch(TaskActions.clearTaskFilter());
  }

  toggleTag(tag: string) {
    const current = this.selectedTags();
    if (current.includes(tag)) {
      this.selectedTags.set(current.filter(t => t !== tag));
    } else {
      this.selectedTags.set([...current, tag]);
    }
  }

  onDeleteTask(taskId: string) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.store.dispatch(TaskActions.deleteTask({ id: taskId }));
    }
  }

  onStatusChange(taskId: string, newStatus: TaskStatus) {
    this.store.dispatch(
      TaskActions.updateTask({ 
        id: taskId, 
        updates: { status: newStatus } 
      })
    );
  }
}
