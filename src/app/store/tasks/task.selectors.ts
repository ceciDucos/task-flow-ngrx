import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState, taskAdapter } from './task.reducer';
import { Task, TaskStatus, TaskPriority } from '../../models/task.model';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const {
  selectIds: selectTaskIds,
  selectEntities: selectTaskEntities,
  selectAll: selectAllTasks,
  selectTotal: selectTaskTotal
} = taskAdapter.getSelectors(selectTaskState);

export const selectTaskLoading = createSelector(
  selectTaskState,
  (state) => state.loading
);

export const selectTaskError = createSelector(
  selectTaskState,
  (state) => state.error
);

export const selectSelectedTaskId = createSelector(
  selectTaskState,
  (state) => state.selectedTaskId
);

export const selectSelectedTask = createSelector(
  selectTaskEntities,
  selectSelectedTaskId,
  (entities, selectedId) => selectedId ? entities[selectedId] : null
);

export const selectTaskFilter = createSelector(
  selectTaskState,
  (state) => state.filter
);

export const selectFilteredTasks = createSelector(
  selectAllTasks,
  selectTaskFilter,
  (tasks, filter) => {
    let filtered = [...tasks];

    if (filter.status) {
      filtered = filtered.filter(task => task.status === filter.status);
    }

    if (filter.priority) {
      filtered = filtered.filter(task => task.priority === filter.priority);
    }

    if (filter.searchTerm) {
      const searchLower = filter.searchTerm.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower)
      );
    }

    if (filter.tags && filter.tags.length > 0) {
      filtered = filtered.filter(task =>
        filter.tags!.some(tag => task.tags.includes(tag))
      );
    }

    return filtered;
  }
);

export const selectTasksByStatus = createSelector(
  selectAllTasks,
  (tasks) => {
    return {
      backlog: tasks.filter(t => t.status === TaskStatus.BACKLOG),
      todo: tasks.filter(t => t.status === TaskStatus.TODO),
      development: tasks.filter(t => t.status === TaskStatus.DEVELOPMENT),
      testing: tasks.filter(t => t.status === TaskStatus.TESTING),
      done: tasks.filter(t => t.status === TaskStatus.DONE)
    };
  }
);

export const selectTasksByPriority = createSelector(
  selectAllTasks,
  (tasks) => {
    return {
      high: tasks.filter(t => t.priority === TaskPriority.HIGH),
      medium: tasks.filter(t => t.priority === TaskPriority.MEDIUM),
      low: tasks.filter(t => t.priority === TaskPriority.LOW)
    };
  }
);

export const selectTaskStats = createSelector(
  selectAllTasks,
  (tasks) => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === TaskStatus.DONE).length;
    const inProgress = tasks.filter(t => t.status === TaskStatus.DEVELOPMENT || t.status === TaskStatus.TESTING).length;
    const high = tasks.filter(t => t.priority === TaskPriority.HIGH).length;
    
    return {
      total,
      completed,
      inProgress,
      high,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }
);

export const selectAllTags = createSelector(
  selectAllTasks,
  (tasks) => {
    const tagsSet = new Set<string>();
    tasks.forEach(task => {
      task.tags.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }
);
