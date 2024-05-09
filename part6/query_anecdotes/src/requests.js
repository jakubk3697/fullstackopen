import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () =>
  axios.get(baseUrl).then((response) => response.data);

export const createAnecdote = async (content) =>
  axios.post(baseUrl, { content, votes: 0 }).then((response) => response.data);

export const voteAnecdote = async (anecdote) =>
  axios
    .put(`${baseUrl}/${anecdote.id}`, {
      ...anecdote,
      votes: anecdote.votes + 1,
    })
    .then((response) => response.data);
