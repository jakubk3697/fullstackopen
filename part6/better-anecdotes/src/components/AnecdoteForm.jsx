import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";

export const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(newAnecdote({ content }));
    dispatch(setNotification(`You created '${content}'`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};
