import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Todo from "../Todo";
import { describe, test, expect } from "vitest";

describe("Todo component", () => {
  const mockTodo = {
    text: "Test todo",
    done: false,
  };

  test("renders todo text", () => {
    render(<Todo todo={mockTodo} onDelete={() => {}} onComplete={() => {}} />);

    const todoElement = screen.getByText("Test todo");
    expect(todoElement).toBeInTheDocument();
  });

  test("shows completed status when todo is done", () => {
    const completedTodo = { ...mockTodo, done: true };
    render(
      <Todo todo={completedTodo} onDelete={() => {}} onComplete={() => {}} />
    );

    const completedStatus = screen.getByText("This todo is done");
    expect(completedStatus).toBeInTheDocument();
  });

  test("calls onDelete when delete button is clicked", () => {
    const mockDelete = vi.fn();
    render(
      <Todo todo={mockTodo} onDelete={mockDelete} onComplete={() => {}} />
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);
    expect(mockDelete).toHaveBeenCalledTimes(1);
  });

  test("calls onComplete when complete button is clicked", () => {
    const mockComplete = vi.fn();
    render(
      <Todo todo={mockTodo} onDelete={() => {}} onComplete={mockComplete} />
    );

    const completeButton = screen.getByRole("button", { name: /Set as done/i });
    fireEvent.click(completeButton);
    expect(mockComplete).toHaveBeenCalledTimes(1);
  });
});
