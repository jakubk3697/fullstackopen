import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return {
        message: action.message,
        color: action.color,
      };
    case "CLEAR_NOTIFICATION":
      return { message: null, color: "green" };
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, dispatchNotification] = useReducer(notificationReducer, {
    message: null,
    color: "green",
  });

  return (
    <NotificationContext.Provider
      value={{ notification, dispatchNotification }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
