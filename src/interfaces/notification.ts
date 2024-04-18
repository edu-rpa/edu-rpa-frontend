export enum NotificationType {
  ROBOT_TRIGGER = 'ROBOT_TRIGGER',
  ROBOT_EXECUTION = 'ROBOT_EXECUTION',
  PROCESS_SHARED = 'PROCESS_SHARED',
  CONNECTION_CHECK = 'CONNECTION_CHECK',
}

export interface Notification {
  id: number;
  title: string;
  content: string;
  isRead: boolean;
  type: NotificationType;
  createdAt: Date;
}