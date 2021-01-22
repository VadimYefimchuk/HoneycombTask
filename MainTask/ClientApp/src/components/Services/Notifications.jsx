import { notification } from 'antd';

export const openNotification = (type, title, text) => {
    notification[type]({
      message: title,
      description: text,
    });
  };
