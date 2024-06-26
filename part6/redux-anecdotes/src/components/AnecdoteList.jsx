import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

export const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };

  const filteredAnecdotes = useSelector((state) => {
    switch (filter) {
      case "ALL":
        return state.anecdotes.sort((a, b) => b.votes - a.votes);
      default:
        return state.anecdotes
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};
