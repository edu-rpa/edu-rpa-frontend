import {
  Menu,
  MenuButton,
  Avatar,
  AvatarBadge,
  MenuList,
  MenuItem,
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { NotificationType, Notification } from "@/interfaces/notification";
import { FiAlertCircle } from "react-icons/fi";
import { FaShareSquare, FaPlay } from "react-icons/fa";
import { GrIntegration } from "react-icons/gr";
import { BsFillLightningFill } from "react-icons/bs";
import notificationApi from "@/apis/notificationApi";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const NotificationMenu = () => {
  const [selectedNotification, setSelectedNotification] = useState<Notification>({
    id: 0,
    title: "",
    content: "",
    isRead: false,
    type: NotificationType.ROBOT_EXECUTION,
    createdAt: new Date()
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [countUnread, setCountUnread] = useState<number>(0);
  const PAGE_LIMIT = 5;
  const [curPage, setCurPage] = useState<number>(1);
  const router = useRouter();
  const {
    isOpen,
    onOpen,
    onClose,
  } = useDisclosure();

  async function fetchNotifications() {
    setIsLoading(true);
    const res = await notificationApi.getNotifications(PAGE_LIMIT, curPage);
    setIsLoading(false);
    if (res.length < PAGE_LIMIT) {
      setHasMore(false);
    }
    setNotifications((prev) => [...prev, ...res]);
  }

  async function fetchCountUnread() {
    const res = await notificationApi.getCountUnread();
    setCountUnread(res);
  }

  async function markAsRead(id: number) {
    await notificationApi.markAsRead(id);
    setNotifications((prev) => prev.map((noti) => {
      if (noti.id === id) {
        return { ...noti, isRead: true };
      }
      return noti;
    }));
    setCountUnread(countUnread - 1);
  }

  const readNotification = (notification: Notification) => {
    setSelectedNotification(notification);
    onOpen();
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
  }

  useEffect(() => {
    console.log('Fetching noti...');
    fetchNotifications();
    fetchCountUnread();
  }, [curPage]);

  const handleActionOfNoti = () => {
    onClose();
    switch (selectedNotification.type) {
      case NotificationType.ROBOT_EXECUTION:
      case NotificationType.ROBOT_TRIGGER:
        router.push('/robot');
        break;
      case NotificationType.PROCESS_SHARED:
        router.push('/studio');
        break;
      case NotificationType.CONNECTION_CHECK:
        router.push('/integration-service');
        break;
      default:
        break;
    }
  }

  const mapNotificationTypeToIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.ROBOT_EXECUTION:
        return FaPlay;
      case NotificationType.ROBOT_TRIGGER:
        return BsFillLightningFill;
      case NotificationType.PROCESS_SHARED:
        return FaShareSquare;
      case NotificationType.CONNECTION_CHECK:
        return GrIntegration;
      default:
        return FiAlertCircle;
    }
  };

  return (
    <>
      <Menu>
        <MenuButton>
          <Avatar
            size="sm"
            src="https://img.icons8.com/ios/50/appointment-reminders--v1.png"
          >
            {countUnread > 0 && <AvatarBadge boxSize="1.75em" bg="red.500">{countUnread}</AvatarBadge>}
          </Avatar>
        </MenuButton>
        <MenuList
          style={{ width: '300px', maxHeight: '300px', overflowY: 'scroll' }}
        >
          {notifications.length === 0 && <Text className="mt-5 mb-5" textAlign="center">No notifications</Text>}
          {notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={() => readNotification(notification)}
            >
              <Icon
                as={mapNotificationTypeToIcon(notification.type)}
                color={notification.isRead ? 'gray.400' : 'blue.500'}
                mr={2}
              />
              <div className="flex flex-col w-100">
                {!notification.isRead
                  ? <b>{notification.title.length > 30 ? notification.title.slice(0, 27) + "..." : notification.title}</b>
                  : notification.title.length > 30 ? notification.title.slice(0, 27) + "..." : notification.title}
                <p>{notification.createdAt.toLocaleString()}</p>
              </div>
            </MenuItem>
          ))}
          {hasMore && <Button 
            style={{ width: '100%', marginTop: '10px' }}
            onClick={() => setCurPage(curPage + 1)}
            isLoading={isLoading}
          >Load more</Button>}
        </MenuList>
      </Menu>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedNotification.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedNotification.content}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              className="mr-3"
              onClick={handleActionOfNoti}>
              Go to {NotificationType[selectedNotification.type].split('_')[0].toLowerCase()}
            </Button>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NotificationMenu;