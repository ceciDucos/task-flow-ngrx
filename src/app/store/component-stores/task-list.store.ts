import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Task, TaskFilter } from '../../models/task.model';
import { Observable } from 'rxjs';

export interface TaskListComponentState {
  viewMode: 'grid' | 'list' | 'kanban';
  sortBy: 'date' | 'priority' | 'title';
  sortDirection: 'asc' | 'desc';
  selectedTasks: string[];
  expandedTaskId: string | null;
}

@Injectable()
export class TaskListStore extends ComponentStore<TaskListComponentState> {
  constructor() {
    super({
      viewMode: 'kanban',
      sortBy: 'date',
      sortDirection: 'desc',
      selectedTasks: [],
      expandedTaskId: null
    });
  }

  readonly viewMode$ = this.select(state => state.viewMode);
  readonly sortBy$ = this.select(state => state.sortBy);
  readonly sortDirection$ = this.select(state => state.sortDirection);
  readonly selectedTasks$ = this.select(state => state.selectedTasks);
  readonly expandedTaskId$ = this.select(state => state.expandedTaskId);
  readonly sortConfig$ = this.select(
    this.sortBy$,
    this.sortDirection$,
    (sortBy, sortDirection) => ({ sortBy, sortDirection })
  );

  readonly hasSelectedTasks$ = this.select(
    this.selectedTasks$,
    (selected) => selected.length > 0
  );

  readonly setViewMode = this.updater((state, viewMode: 'grid' | 'list' | 'kanban') => ({
    ...state,
    viewMode
  }));

  readonly setSortBy = this.updater((state, sortBy: 'date' | 'priority' | 'title') => ({
    ...state,
    sortBy
  }));

  readonly toggleSortDirection = this.updater((state) => ({
    ...state,
    sortDirection: state.sortDirection === 'asc' ? 'desc' : 'asc'
  }));

  readonly toggleTaskSelection = this.updater((state, taskId: string) => {
    const selectedTasks = state.selectedTasks.includes(taskId)
      ? state.selectedTasks.filter(id => id !== taskId)
      : [...state.selectedTasks, taskId];
    
    return {
      ...state,
      selectedTasks
    };
  });

  readonly clearSelection = this.updater((state) => ({
    ...state,
    selectedTasks: []
  }));

  readonly selectAllTasks = this.updater((state, taskIds: string[]) => ({
    ...state,
    selectedTasks: taskIds
  }));

  readonly setExpandedTask = this.updater((state, taskId: string | null) => ({
    ...state,
    expandedTaskId: taskId
  }));

  readonly toggleExpandTask = this.updater((state, taskId: string) => ({
    ...state,
    expandedTaskId: state.expandedTaskId === taskId ? null : taskId
  }));
}
