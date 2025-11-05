import { computed } from '@angular/core';
import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  patchState
} from '@ngrx/signals';

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  read: boolean;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0
};

export const NotificationStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  
  withComputed(({ notifications, unreadCount }) => ({
    recentNotifications: computed(() => 
      notifications().slice(0, 5)
    ),
    hasUnread: computed(() => unreadCount() > 0),
    successNotifications: computed(() =>
      notifications().filter(n => n.type === 'success')
    ),
    errorNotifications: computed(() =>
      notifications().filter(n => n.type === 'error')
    )
  })),

  withMethods((store) => ({
    addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) {
      const newNotification: Notification = {
        ...notification,
        id: Date.now().toString(),
        timestamp: new Date(),
        read: false
      };

      patchState(store, (state) => ({
        notifications: [newNotification, ...state.notifications],
        unreadCount: state.unreadCount + 1
      }));

      setTimeout(() => {
        patchState(store, (state) => ({
          notifications: state.notifications.filter(n => n.id !== newNotification.id),
          unreadCount: state.unreadCount - (newNotification.read ? 0 : 1)
        }));
      }, 5000);
    },

    markAsRead(id: string) {
      patchState(store, (state) => {
        const notification = state.notifications.find(n => n.id === id);
        if (notification && !notification.read) {
          return {
            notifications: state.notifications.map(n =>
              n.id === id ? { ...n, read: true } : n
            ),
            unreadCount: state.unreadCount - 1
          };
        }
        return state;
      });
    },

    markAllAsRead() {
      patchState(store, (state) => ({
        notifications: state.notifications.map(n => ({ ...n, read: true })),
        unreadCount: 0
      }));
    },

    clearNotifications() {
      patchState(store, {
        notifications: [],
        unreadCount: 0
      });
    },

    removeNotification(id: string) {
      patchState(store, (state) => {
        const notification = state.notifications.find(n => n.id === id);
        return {
          notifications: state.notifications.filter(n => n.id !== id),
          unreadCount: notification && !notification.read 
            ? state.unreadCount - 1 
            : state.unreadCount
        };
      });
    }
  }))
);
