/* eslint-disable react/prop-types */
import { createContext, useReducer, useEffect } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return {
        message: action.payload,
        duration: action.duration,
      };
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );

  useEffect(() => {
    if (notification && notification.duration) {
      const timer = setTimeout(() => {
        notificationDispatch({ type: "CLEAR_NOTIFICATION" });
      }, notification.duration * 1000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
