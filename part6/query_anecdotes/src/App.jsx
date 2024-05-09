import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, createAnecdote, voteAnecdote } from "./requests";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useContext } from "react";
import NotificationContext from "./NotificationContext";

const App = () => {
  const queryClient = useQueryClient();
  const [, notificationDispatch] = useContext(NotificationContext);

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], [...anecdotes, newAnecdote]);
    },
    onError: (error) => {
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: error.response.data.error,
        duration: 5,
      });
    },
  });

  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      const updatedAnecdotes = anecdotes.map((a) =>
        a.id === anecdote.id ? anecdote : a
      );
      queryClient.setQueryData(["anecdotes"], updatedAnecdotes);
    },
  });

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote);
    notificationDispatch({
      type: "SET_NOTIFICATION",
      payload: `You voted '${anecdote.content}'`,
      duration: 5,
    });
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: false,
  });

  if (result.isLoading) return <div>Loading...</div>;
  if (result.isError)
    return <h2>Anecdote service not available due to problems in server</h2>;

  const anecdotes = result.data || [];

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
