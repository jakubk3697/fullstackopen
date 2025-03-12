import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Todo from "../Todo";

describe("Todo Component", () => {
  const mockTodo = {
    _id: "1",
    text: "Test todo",
    done: false,
  };

  const deleteTodoMock = vi.fn();
  const completeTodoMock = vi.fn();

  it("renders todo text correctly", () => {
    render(
      <Todo
        todo={mockTodo}
        deleteTodo={deleteTodoMock}
        completeTodo={completeTodoMock}
      />
    );

    expect(screen.getByText("Test todo")).toBeDefined();
  });

  it("shows correct status for incomplete todo", () => {
    render(
      <Todo
        todo={mockTodo}
        deleteTodo={deleteTodoMock}
        completeTodo={completeTodoMock}
      />
    );

    expect(screen.getByText("This todo is not done")).toBeDefined();
    expect(screen.getByText("Set as done")).toBeDefined();
  });

  it("shows correct status for completed todo", () => {
    const completedTodo = { ...mockTodo, done: true };

    render(
      <Todo
        todo={completedTodo}
        deleteTodo={deleteTodoMock}
        completeTodo={completeTodoMock}
      />
    );

    expect(screen.getByText("This todo is done")).toBeDefined();
    expect(screen.queryByText("Set as done")).toBeNull();
  });

  it("calls deleteTodo when delete button is clicked", () => {
    render(
      <Todo
        todo={mockTodo}
        deleteTodo={deleteTodoMock}
        completeTodo={completeTodoMock}
      />
    );

    fireEvent.click(screen.getByText("Delete"));
    expect(deleteTodoMock).toHaveBeenCalledWith(mockTodo);
  });

  it("calls completeTodo when set as done button is clicked", () => {
    render(
      <Todo
        todo={mockTodo}
        deleteTodo={deleteTodoMock}
        completeTodo={completeTodoMock}
      />
    );

    fireEvent.click(screen.getByText("Set as done"));
    expect(completeTodoMock).toHaveBeenCalledWith(mockTodo);
  });
});
