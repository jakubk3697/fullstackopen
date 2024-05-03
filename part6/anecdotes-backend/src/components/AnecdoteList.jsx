import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";

export const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));

    dispatch(setNotification(`You voted for '${anecdote.content}'`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  const filteredAnecdotes = useSelector((state) => {
    switch (filter) {
      case "ALL":
        return [...state.anecdotes].sort((a, b) => b.votes - a.votes);
      default:
        return [...state.anecdotes]
          .filter((anecdote) =>
            anecdote.content.toLowerCase().includes(filter.toLowerCase())
          )
          .sort((a, b) => b.votes - a.votes);
    }
  });

  return (
    <>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};
