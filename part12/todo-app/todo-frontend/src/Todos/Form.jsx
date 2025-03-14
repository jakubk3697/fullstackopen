/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

const TodoForm = ({ createTodo }) => {
  const [text, setText] = useState("");

  const onChange = ({ target }) => {
    setText(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTodo({ text });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "48px" }}>
      <input type="text" name="text" value={text} onChange={onChange} />
      <button type="submit"> Submit </button>
    </form>
  );
};

export default TodoForm;
