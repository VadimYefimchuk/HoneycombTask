import { notification } from 'antd';


export const openNotification = (type, title, text, time = 4) => {
    let backgroundColorStyle;
    switch(type){
        case 'success':
            backgroundColorStyle = {backgroundColor: "#caff7a"};
            break
        case 'info':
            backgroundColorStyle = {backgroundColor: "#8aefff"};
            break
        case 'warning':
            backgroundColorStyle = {backgroundColor: "#ffd37a"};
            break
        case 'error':
            backgroundColorStyle = {backgroundColor: "#ff8a8a"};
            break
        default:
            backgroundColorStyle = {backgroundColor: "#a39e9e"};
            break
    }

    notification[type]({
      message: title,
      description: text,
      style: backgroundColorStyle, 
      duration: time,
    });
  };
