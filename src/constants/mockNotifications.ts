import { Notification, NotificationType } from "@/interfaces/notification";

export const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "Notification 1",
    content: "Content 1",
    isRead: false,
    type: NotificationType.ROBOT_EXECUTION,
    createdAt: new Date("2024-04-18T10:00:00")
  },
  {
    id: 2,
    title: "Notification 2 long title hahahahahahahahahahahaha hohohohohoho",
    content: "Content 2",
    isRead: false,
    type: NotificationType.ROBOT_TRIGGER,
    createdAt: new Date("2024-04-18T10:00:00")
  },
  {
    id: 3,
    title: "Notification 3",
    content: "Content 3",
    isRead: true,
    type: NotificationType.PROCESS_SHARED,
    createdAt: new Date("2024-04-18T10:00:00")
  },
  {
    id: 4,
    title: "Notification 4",
    content: "Content 4",
    isRead: false,
    type: NotificationType.CONNECTION_CHECK,
    createdAt: new Date("2024-04-18T10:00:00")
  },
  {
    id: 5,
    title: "Notification 5",
    content: "Content 5",
    isRead: false,
    type: NotificationType.ROBOT_EXECUTION,
    createdAt: new Date("2024-04-18T10:00:00")
  },
  {
    id: 6,
    title: "Notification 6",
    content: "Content 6",
    isRead: false,
    type: NotificationType.ROBOT_TRIGGER,
    createdAt: new Date("2024-04-18T10:00:00")
  },
  {
    id: 7,
    title: "Notification 7",
    content: "Content 7",
    isRead: false,
    type: NotificationType.PROCESS_SHARED,
    createdAt: new Date("2024-04-18T10:00:00")
  },
  {
    id: 8,
    title: "Notification 8",
    content: "Content 8",
    isRead: false,
    type: NotificationType.CONNECTION_CHECK,
    createdAt: new Date("2024-04-18T10:00:00")
  },
  {
    id: 9,
    title: "Notification 9",
    content: "Content 9",
    isRead: true,
    type: NotificationType.ROBOT_EXECUTION,
    createdAt: new Date("2024-04-18T10:00:00")
  },
  {
    id: 10,
    title: "Notification 10",
    content: "Content 10",
    isRead: true,
    type: NotificationType.ROBOT_TRIGGER,
    createdAt: new Date("2024-04-18T10:00:00")
  },
];