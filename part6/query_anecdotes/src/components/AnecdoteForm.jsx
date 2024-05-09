import { useContext } from "react";
import NotificationContext from "../NotificationContext";

/* eslint-disable react/prop-types */
const AnecdoteForm = ({ newAnecdoteMutation }) => {
  const [notification, notificationDispatch] = useContext(NotificationContext);

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate(content);
    notificationDispatch({
      type: "SET_NOTIFICATION",
      payload: `You created ${content}`,
      duration: 5,
    });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
