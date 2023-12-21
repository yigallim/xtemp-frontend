import { NotificationInstance } from 'antd/es/notification/interface';
import { createContext } from 'react';

const NotificationContext = createContext<NotificationInstance | null>(null);

export default NotificationContext;