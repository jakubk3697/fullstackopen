import { useEffect, useState } from "react";
import axios from "../util/apiClient";

import List from "./List";
import Form from "./Form";

const TodoView = () => {
  const [todos, setTodos] = useState([]);

  const refreshTodos = async () => {
    const { data } = await axios.get("/todos");
    setTodos(data);
  };

  useEffect(() => {
    refreshTodos();
  }, []);

  const createTodo = async (todo) => {
    const { data } = await axios.post("/todos", todo);
    setTodos([...todos, data]);
  };

  const deleteTodo = async (todo) => {
    await axios.delete(`/todos/${todo._id}`);
    refreshTodos();
  };

  const completeTodo = async (todo) => {
    await axios.put(`/todos/${todo._id}`, {
      text: todo.text,
      done: true,
    });
    refreshTodos();
  };

  return (
    <div
      style={{
        margin: "auto",
        width: "70%",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1>Todos</h1>
      <Form createTodo={createTodo} />
      <List todos={todos} deleteTodo={deleteTodo} completeTodo={completeTodo} />
    </div>
  );
};

export default TodoView;
