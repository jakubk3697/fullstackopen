import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const style = {
    border: "solid",
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    marginBottom: 24,
    marginTop: 24,
  };

  switch (notification.message) {
    case null:
      style.display = "none";
      break;
    default:
      style.display = "";
      break;
  }

  return <div style={style}>{notification.message}</div>;
};

export default Notification;
