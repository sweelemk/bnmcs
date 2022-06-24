import { notification as antnotifications } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationInterface {
  type: NotificationType,
  title: string,
  description: string,
}

export const notification = ({ type, title, description }: NotificationInterface) => {
  antnotifications[type]({
    message: title,
    description
  });
};
